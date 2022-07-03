import React from "react";
import { useSession } from "next-auth/react";
import LetterAvatar from "./LetterAvatar";
import { SessionUser } from "@/types/User";

interface SessionAvatarProps {}

const SessionAvatar: React.FC<SessionAvatarProps> = (props) => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    const user = session.user as SessionUser;
    return <LetterAvatar name={user.name} />;
  }

  return <a href="/api/auth/signin">Sign in</a>;
};

export default SessionAvatar;
