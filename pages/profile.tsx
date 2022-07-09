import type { GetServerSideProps } from "next";
import type { SessionUser } from "@/types/User";
import { Role } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SessionAvatar from "@/components/SessionAvatar";
import Header from "@/components/Header";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "@/lib/prisma";

interface RoleUser extends SessionUser {
  role: Role;
}

interface ProfilePageServerSideProps {
  user: RoleUser | null;
}

interface ProfilePageProps extends ProfilePageServerSideProps {}

export default function ProfilePage({ user }: ProfilePageProps) {
  if (!user) {
    return (
      <>
        <Header />
        <Container maxWidth="xl" sx={{ height: "100%", paddingBlock: "1rem" }}>
          <Alert severity="error">Session couldn&apos;t authenticated!</Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        paddingY="4rem"
        gap="2rem"
      >
        <Grid item xs={1}>
          <SessionAvatar size="12rem" fontSize="8em" />
        </Grid>

        <Grid item xs={1}>
          <Typography
            fontSize={20}
            align="center"
            fontWeight={500}
            fontFamily="monospace"
          >
            {user.name}
            <br />
            {user.email}
            <br />
            {user.role}
          </Typography>
        </Grid>

        <Grid item xs={1}>
          <Button variant="outlined" onClick={() => signOut()}>
            Sign out
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  ProfilePageServerSideProps
> = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session?.user) {
    return { props: { user: null } };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return { props: { user: null } };
  }

  return {
    props: {
      user: {
        name: session.user.name,
        email: session.user.email,
        role: user.role,
      },
    },
  };
};
