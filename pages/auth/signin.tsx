import LogoLabelDesktop from "@/components/LogoLabelDesktop";
import LogoLabelMobile from "@/components/LogoLabelMobile";
import RhfTextField from "@/components/RhfTextField";
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function SignInPage() {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as FieldValues,
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await signIn("credentials", { redirect: false, ...data });

    if (!res || res.error) {
      setError("password", {
        type: "custom",
        message: res ? res.error : "Undefined response",
      });
      return;
    }

    return router.replace("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "1rem",
      }}
    >
      <Paper
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "24rem",
          gap: "2rem",
          padding: "1.5rem",
          position: "relative",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "calc(100% - 2rem)",
            padding: "1rem",
            background: "#444",
            borderRadius: "5rem",
            position: "absolute",
            top: 0,
            transform: "translateY(-50%)",
            left: "1rem",
            right: "1rem",
          }}
        >
          <LogoLabelDesktop />
        </Paper>

        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          marginBottom={2}
          marginTop={5}
        >
          Sign In
        </Typography>

        <>
          {Object.keys(errors).map((field, index) => (
            <Alert severity="error" key={index + field}>
              {/* @ts-ignore: React hook form typing problems */}
              {errors[field]?.message === "CredentialsSignin"
                ? "Invalid credentials"
                : errors[field]?.message}
            </Alert>
          ))}
        </>

        <RhfTextField
          control={control}
          name="email"
          label="Email address"
          type="email"
        />

        <RhfTextField
          control={control}
          name="password"
          label="Password"
          type="password"
        />

        <Button type="submit" variant="contained">
          Sign in
        </Button>
      </Paper>
    </Box>
  );
}
