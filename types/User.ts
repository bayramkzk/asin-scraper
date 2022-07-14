import { Role } from "@prisma/client";

export interface SessionUser {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  role: Role;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  hash: string;
  createdAt: Date;
  role: Role;
}
