import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";

type UserDataActionGroupProps = {
  selectedUserIds: number[];
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
  onCreate: React.MouseEventHandler<HTMLButtonElement>;
};

const UserDataActionGroup: React.FC<UserDataActionGroupProps> = (props) => {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          color="error"
          disabled={!props.selectedUserIds.length}
          onClick={props.onDelete}
        >
          Delete
        </Button>
        <Button onClick={props.onCreate}>Create</Button>
      </ButtonGroup>
    </Box>
  );
};

export default UserDataActionGroup;
