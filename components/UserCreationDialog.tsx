import type { PostUserBody } from "@/utils/postUser";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import RhfRoleSelect from "./RhfRoleSelect";
import RhfTextField from "./RhfTextField";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: SubmitHandler<PostUserBody>;
  error: string | undefined;
};

const UserCreationDialog: React.FC<Props> = (props) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      role: "USER",
    } as FieldValues,
  });

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Create User</DialogTitle>

      <DialogContent sx={{ padding: 0 }}>
        <Paper
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1rem",
            backgroundColor: "inherit",
            width: "24rem",
            maxWidth: "100%",
          }}
          onSubmit={handleSubmit(props.onCreate)}
        >
          {!!props.error && <Alert severity="error">{props.error}</Alert>}
          <RhfTextField
            control={control}
            type="text"
            label="Name"
            name="name"
          />
          <RhfTextField
            control={control}
            type="email"
            label="Email address"
            name="email"
          />
          <RhfTextField
            control={control}
            type="password"
            label="Password"
            name="password"
          />
          <RhfRoleSelect name="role" control={control} />
        </Paper>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={handleSubmit(props.onCreate)}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserCreationDialog;
