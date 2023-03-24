import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { Navigate, Link as ReactLink } from "react-router-dom";
import axios from "axios";
import useQueryFirebaseUser from "../hooks/useQueryFirebaseUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const Register = () => {
  const [username, setUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [user, setUser] = useState<User | null>();

  const queryClient = useQueryClient();
  // FireBaseユーザー登録
  const createUserFireBase = () => {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword).then(
      (userCredential) => {
        queryClient.setQueryData(["fireBaseUser"], userCredential);
        console.log(userCredential.user.getIdToken());
      }
    );
  };
  // ブログユーザー登録
  const createUserBlog = () => {
    axios
      .post(
        "https://api-blog-dev.lightsail.ijcloud.jp/users",
        {
          name: username,
          email: signupEmail,
          password: signupPassword,
        },
        {
          headers: {
            // Authorization: "Bearer " + fireBaseUser?.getIdToken(),
            Authorization: "Bearer aaaaa",
            accept: "application/json",
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {});
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createUserFireBase();
      await createUserBlog();
    } catch (error) {
      console.log(error);
      alert("エラー");
    }
  };
  const fireBaseUser = queryClient.getQueryData<User | null>(["fireBaseUser"]);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  return (
    <>
      {user ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOpenOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  新規登録
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  {/* <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  /> */}
                  {/* <input
                    type="text"
                    required
                    id="email"
                    name="email"
                    defaultValue={signupEmail} */}
                  {/* // onChange={(e) => setSignupEmail(e.target.value)} */}
                  {/* /> */}
                  {/* <TextField
                    id="outlined-controlled"
                    label="Controlled"
                    value={name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setSignupEmail(event.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-uncontrolled"
                    label="Uncontrolled"
                    defaultValue="foo"
                  /> */}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    新規登録
                  </Button>
                  <p>
                    ログインは<ReactLink to={"/login/"}>こちら</ReactLink>
                  </p>
                </Box>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          </ThemeProvider>
        </>
      )}
      ;
    </>
  );
};

export default Register;
