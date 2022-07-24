import { PostProductsResult } from "@/utils/postProducts";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useSWRConfig } from "swr";

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
  const [text, setText] = React.useState("");
  const [asinCount, setAsinCount] = React.useState(0);
  const [result, setResult] = React.useState<PostProductsResult | null>(null);
  const [resultOpen, setResultOpen] = React.useState(false);

  const handleResultOpen = () => setResultOpen(true);
  const handleResultClose = () => {
    setResultOpen(false);
    setAsinCount(0);
    setResult(null);
  };

  const handleSubmit = async () => {
    const body = { asinCodes: text.trim().split("\n") };

    handleClose();
    setAsinCount(body.asinCodes.length);
    setLoading(true);

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
    const postProductsRes = res as PostProductsResult;

    setResult(postProductsRes);
    setLoading(false);
    mutate("/api/products");
    handleResultOpen();
    setText("");
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Insert Products</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Please sort down the ASIN (Amazon Standard Identification Number)
            codes of the products line by line into the text field below.
          </DialogContentText>

          <TextField
            autoFocus
            margin="normal"
            id="asin"
            label="ASIN codes"
            type="text"
            variant="filled"
            fullWidth
            multiline
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Insert</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={resultOpen} onClose={handleResultClose} fullWidth={true}>
        <DialogTitle>Product Insertion Result</DialogTitle>

        <DialogContent>
          <DialogContentText marginBottom="1rem">
            {result?.createdCount} products out of the total {asinCount} entered
            products have been inserted!
          </DialogContentText>

          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <DoneAllIcon color="success" sx={{ width: 128, height: 128 }} />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleResultClose}>Exit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
