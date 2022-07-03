import * as React from "react";
import Avatar, { AvatarProps } from "@mui/material/Avatar";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function parseNameAbbr(name: string): string {
  const words = name
    .toUpperCase()
    .split(" ")
    .filter((s) => s);
  if (words.length > 2) {
    return words[0][0] + words[words.length - 1][0];
  }
  return words.map((w) => w[0]).join("");
}

function stringAvatar(name: string): AvatarProps {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: parseNameAbbr(name),
    alt: name,
  };
}

interface LetterAvatarProps extends AvatarProps {
  name: string;
}

export default function LetterAvatar({ name, ...rest }: LetterAvatarProps) {
  return <Avatar {...stringAvatar(name)} {...rest} />;
}
