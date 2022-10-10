import useProducts from "@/hooks/useProducts";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid, GridCellEditStopParams, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { useSWRConfig } from "swr";
import ProductExportButton from "./ProductExportButton";
import ProductInsertionDialog from "./ProductInsertionDialog";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number", width: 100, editable: true },
  {
    field: "asin",
    headerName: "ASIN",
    type: "string",
    width: 200,
    editable: true,
  },
  {
    field: "aePrice",
    headerName: "AE Price (AE)",
    type: "number",
    width: 200,
    editable: true,
  },
  {
    field: "aedToDollar",
    headerName: "AE Price (US)",
    type: "number",
    width: 200,
    editable: true,
  },
  {
    field: "rate",
    headerName: "Rate",
    type: "number",
    width: 200,
    editable: true,
  },
  {
    field: "rating",
    headerName: "Rating",
    type: "number",
    width: 200,
    editable: true,
  },
  {
    field: "comPrice",
    headerName: "COM Price (USD)",
    type: "number",
    width: 200,
    editable: true,
  },
  {
    field: "shippingCost",
    headerName: "COM Shipping Cost to AE (USD)",
    type: "number",
    width: 300,
    editable: true,
  },
  {
    field: "importFee",
    headerName: "COM Import Fee (USD)",
    type: "number",
    width: 250,
    editable: true,
  },
  {
    field: "totalPrice",
    headerName: "COM Total Price (USD)",
    type: "number",
    width: 250,
    editable: true,
  },
  {
    field: "comRank",
    headerName: "COM Seller Rank Info",
    type: "string",
    width: 750,
    editable: true,
  },
  {
    field: "soldBy",
    headerName: "Sold By",
    type: "string",
    width: 250,
    editable: true,
  },
  { field: "createdAt", headerName: "Creation Date", type: "date", width: 250 },
];

export default function ProductDataGrid() {
  const { mutate } = useSWRConfig();
  const { products, error, loading } = useProducts();
  const [open, setOpen] = React.useState(false);
  const [mutationLoading, setMutationLoading] = React.useState(false);
  const [selection, setSelection] = React.useState<number[]>([]);

  const handleInsertDialogOpen = () => {
    setOpen(true);
  };

  const handleInsertDialogClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setMutationLoading(true);

    const body = { idList: selection };
    await fetch("/api/products", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());

    mutate("/api/products");
    setMutationLoading(false);
  };

  const handleEdit = async (
    params: GridCellEditStopParams,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMutationLoading(true);
    const type = columns.find((col) => col.field === params.field)!.type;
    const value =
      type === "number"
        ? Number(event.target.value)
        : event.target.value === "date"
        ? new Date(event.target.value)
        : event.target.value;

    const body = {
      id: params.id,
      data: { [params.field]: value },
    };
    await fetch("/api/products", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());

    mutate("/api/products");
    setMutationLoading(false);
  };

  if (loading) {
    return <LinearProgress />;
  }

  if (error || products === undefined) {
    return (
      <Container maxWidth="xl" sx={{ height: "100%", paddingBlock: "1rem" }}>
        <Alert severity="error">{error.info ?? "An error occurred!"}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ height: "100%", paddingBlock: "1rem" }}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <ProductExportButton products={products} columns={columns} />

            <Button
              color="error"
              disabled={selection.length === 0}
              onClick={handleDelete}
            >
              Delete
            </Button>

            <Button onClick={handleInsertDialogOpen}>Insert</Button>
          </ButtonGroup>
        </Box>

        <DataGrid
          rows={products}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          loading={mutationLoading}
          selectionModel={selection}
          onSelectionModelChange={(sel) => setSelection(sel.map(Number))}
          experimentalFeatures={{ newEditingApi: true }}
          // @ts-ignore: mui type problem
          onCellEditStop={handleEdit}
          initialState={{
            sorting: {
              sortModel: [{ field: "id", sort: "asc" }],
            },
          }}
        />

        <ProductInsertionDialog
          open={open}
          handleClose={handleInsertDialogClose}
          setLoading={setMutationLoading}
        />
      </Box>
    </Container>
  );
}
