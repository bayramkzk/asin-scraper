import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { signIn } from "next-auth/react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import RhfTextField from "@/components/RhfTextField";

export default function SignInPage() {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();
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
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          marginBottom={2}
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
