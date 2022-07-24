import useUsers from "@/hooks/useUsers";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from "swr";
import UserCreationDialog from "./UserCreationDialog";
import UserDataActionGroup from "./UserDataActionGroup";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number", width: 100 },
  { field: "name", headerName: "Name", type: "string", width: 200 },
  { field: "email", headerName: "Email", type: "string", width: 250 },
  { field: "role", headerName: "Role", type: "role", width: 100 },
  { field: "createdAt", headerName: "Creation Date", type: "date", width: 250 },
];

export default function UserDataGrid() {
  const { mutate } = useSWRConfig();
  const { loading, error, users } = useUsers();
  const [selection, setSelection] = React.useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogError, setDialogError] = React.useState<string | undefined>();

  const handleDelete = () => {
    if (!selection.length) return;
    mutate("/api/users", async () => {
      await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idList: selection }),
      });
    });
  };

  const handleCreate: SubmitHandler<FieldValues> = async (fieldValues) => {
    await mutate("/api/users", async () => {
      const { error } = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fieldValues),
      }).then((res) => res.json());
      setDialogError(error);
      if (error === undefined) setDialogOpen(false);
    });
  };

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
        <UserDataActionGroup
          selectedUserIds={selection}
          onCreate={() => setDialogOpen(true)}
          onDelete={handleDelete}
        />

        <DataGrid
          rows={users}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          selectionModel={selection}
          onSelectionModelChange={(sel) => setSelection(sel as number[])}
        />

        <UserCreationDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onCreate={handleCreate}
          error={dialogError}
        />
      </Box>
    </Container>
  );
}
