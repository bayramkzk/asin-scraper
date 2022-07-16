import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useUsers from "@/hooks/useUsers";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number", width: 100 },
  { field: "name", headerName: "Name", type: "string", width: 200 },
  { field: "email", headerName: "Email", type: "string", width: 250 },
  { field: "role", headerName: "Role", type: "role", width: 100 },
  { field: "createdAt", headerName: "Creation Date", type: "date", width: 250 },
];

export default function UserDataGrid() {
  const { loading, error, users } = useUsers();

  if (loading) {
    return <LinearProgress />;
  }

  if (error || users === undefined) {
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
        <DataGrid
          rows={users}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Container>
  );
}
