import { ProductInsertionStatusMap } from "@/types/ProductInsertionStatusMap";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useSWRConfig } from "swr";
import ProductInsertionLoadingTable from "./ProductInsertionLoadingTable";

interface ProductInsertionDialogProps {
  open: boolean;
  handleClose: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProductInsertionDialog({
  open,
  handleClose,
  setLoading,
}: ProductInsertionDialogProps) {
  const { mutate } = useSWRConfig();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDone, setIsDone] = React.useState(true);
  const [asinText, setAsinText] = React.useState("");
  const asinCodes = React.useMemo(() => {
    return asinText
      .split("\n")
      .map((str) => str.trim())
      .filter((str) => str.length > 0)
      .filter((str, index, arr) => arr.indexOf(str) === index);
  }, [asinText]);
  const [statusMap, setStatusMap] = React.useState<ProductInsertionStatusMap>(
    {}
  );

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isDone && !open) {
        setIsSubmitting(false);
        setAsinText("");
        setStatusMap({});
        mutate("/api/products");
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isDone, open]);

  const handleSubmit = async () => {
    if (isSubmitting || asinCodes.length === 0) return;

    setIsSubmitting(true);
    setLoading(true);
    setIsDone(false);

    setStatusMap(() => {
      return asinCodes.reduce((acc, asin) => {
        return { ...acc, [asin]: "pending" };
      }, {});
    });

    await Promise.allSettled(
      asinCodes.map(async (asin) => {
        setStatusMap((map) => ({ ...map, [asin]: "loading" }));

        await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ asinCodes: [asin] }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(`POST PRODUCT ${asin}`, res);
            setStatusMap((map) => ({
              ...map,
              [asin]: res.error || res.createdCount === 0 ? "error" : "success",
            }));
          })
          .catch(() => {
            setStatusMap((map) => ({ ...map, [asin]: "error" }));
          });
      })
    );

    setLoading(false);
    setIsDone(true);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Insert Products</DialogTitle>

      <DialogContent>
        <DialogContentText>
          {isSubmitting
            ? `Please wait while products are being inserted...`
            : `Please sort down the ASIN (Amazon Standard Identification Number)
               codes of the products line by line into the text field below.`}
        </DialogContentText>

        {isSubmitting ? (
          <ProductInsertionLoadingTable statusMap={statusMap} />
        ) : (
          <TextField
            autoFocus
            margin="normal"
            id="asin"
            label="ASIN codes"
            type="text"
            variant="filled"
            fullWidth
            multiline
            value={asinText}
            onChange={(e) => setAsinText(e.target.value)}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          {isSubmitting ? "Exit" : "Cancel"}
        </Button>

        {!isSubmitting && <Button onClick={handleSubmit}>Insert</Button>}
      </DialogActions>
    </Dialog>
  );
}
