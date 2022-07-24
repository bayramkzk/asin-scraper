import { PostUserBody } from "@/utils/postUser";
import WarningIcon from "@mui/icons-material/Warning";
import { FormControl, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSession } from "next-auth/react";
import { useId } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

type Props = {
  name: keyof PostUserBody;
  control: Control<FieldValues, any>;
};

function RhfRoleSelect({ name, control }: Props) {
  const id = useId();
  const { data: session } = useSession();

  if (
    !session ||
    (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN")
  ) {
    return <WarningIcon />;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControl fullWidth>
          <InputLabel id={`${id}-label`}>Role</InputLabel>
          <Select
            labelId={`${id}-label`}
            id={id}
            value={value}
            label="Role"
            onChange={onChange}
          >
            {session.user.role === "SUPERADMIN" && (
              <MenuItem value="ADMIN">Admin</MenuItem>
            )}
            <MenuItem value="USER">User</MenuItem>
          </Select>
        </FormControl>
      )}
    />
  );
}

export default RhfRoleSelect;
