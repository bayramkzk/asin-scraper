import { User } from "@prisma/client";
import useSWR from "swr";

export default function useUsers() {
  const { data, error } = useSWR<User[]>("/api/users");

  if (error) {
    console.error(error);
  }

  return {
    users: data,
    error,
    loading: !error && !data,
  };
}
