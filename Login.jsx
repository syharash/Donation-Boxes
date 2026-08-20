import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

export default function Login() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "/";
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "100px auto" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Login</Typography>

        <TextField fullWidth label="Email" margin="normal" onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" onChange={(e) => setPassword(e.target.value)} />

        <Button fullWidth variant="contained" sx={{ marginTop: 2 }} onClick={login}>
          Sign In
        </Button>
      </CardContent>
    </Card>
  );
}
