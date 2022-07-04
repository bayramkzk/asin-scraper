import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ProductInsertionDialog from "./ProductInsertionDialog";
import useProducts from "@/hooks/useProducts";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number", width: 100 },
  { field: "asin", headerName: "ASIN", type: "string", width: 200 },
  { field: "aePrice", headerName: "AE Price (AE)", type: "number", width: 200 },
  {
    field: "aedToDollar",
    headerName: "AE Price (US)",
    type: "number",
    width: 200,
  },
  { field: "rate", headerName: "Rate", type: "number", width: 200 },
  { field: "rating", headerName: "Rating", type: "number", width: 200 },
  {
    field: "comPrice",
    headerName: "COM Price (USD)",
    type: "number",
    width: 200,
  },
  {
    field: "shippingCost",
    headerName: "COM Shipping Cost to AE (USD)",
    type: "number",
    width: 300,
  },
  {
    field: "importFee",
    headerName: "COM Import Fee (USD)",
    type: "number",
    width: 250,
  },
  {
    field: "totalPrice",
    headerName: "COM Total Price (USD)",
    type: "number",
    width: 250,
  },
  {
    field: "comRank",
    headerName: "COM Seller Rank Info",
    type: "string",
    width: 600,
  },
  { field: "createdAt", headerName: "Creation Date", type: "date", width: 250 },
];

export default function ProductDataGrid() {
  const { products, error, loading } = useProducts();
  const [open, setOpen] = React.useState(false);
  const [insertionLoading, setInsertionLoading] = React.useState(false);

  const handleInsertDialogOpen = () => {
    setOpen(true);
  };

  const handleInsertDialogClose = () => {
    setOpen(false);
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
            <Button onClick={handleInsertDialogOpen}>
              Insert products by ASIN
            </Button>
          </ButtonGroup>
        </Box>

        <DataGrid
          rows={products}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          loading={insertionLoading}
        />

        <ProductInsertionDialog
          open={open}
          handleClose={handleInsertDialogClose}
          setLoading={setInsertionLoading}
        />
      </Box>
    </Container>
  );
}
