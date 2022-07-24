import { SessionUser } from "@/types/User";
import WarningIcon from "@mui/icons-material/Warning";
import { useSession } from "next-auth/react";
import React from "react";
import LetterAvatar from "./LetterAvatar";

interface SessionAvatarProps {
  size?: number | string;
  fontSize?: number | string;
}

const SessionAvatar: React.FC<SessionAvatarProps> = ({ size, fontSize }) => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    const user = session.user as SessionUser;
    return (
      <LetterAvatar
        name={user.name}
        sx={{ width: size, height: size, fontSize }}
      />
    );
  }

  return <WarningIcon />;
};

export default SessionAvatar;
