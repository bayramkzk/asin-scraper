import Header from "@/components/Header";
import SessionAvatar from "@/components/SessionAvatar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { signOut, useSession } from "next-auth/react";

interface ProfilePageProps {}

export default function ProfilePage(props: ProfilePageProps) {
  const { data: session } = useSession();

  if (!session?.user) {
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
            {session.user.name}
            <br />
            {session.user.email}
            <br />
            {session.user.role}
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
