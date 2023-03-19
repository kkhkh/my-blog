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
import CameraIcon from "@mui/icons-material/Camera";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, provider } from "../FirebaseConfig";
import { Navigate, Link as ReactLink } from "react-router-dom";
import ReactModal from "react-modal";

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

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const theme = createTheme();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // const [user, setuser] = useState<User | string | null | undefined>();
  const [user, setuser] = useState<any>();
  const [openModal, setOpenModal] = React.useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  // パスワードリセットメール送信
  const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
    console.log(resetEmail);
    await sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        setOpenModal(false);
        setResetEmail("");
      })
      .catch((error) => {
        alert(error.message);
        setResetEmail("");
      });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log(loginEmail);
      console.log(loginPassword);
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(
        (_userCredential) => {
          console.log(_userCredential);
        }
      );
    } catch (error) {
      console.log(error);
      alert("メールアドレスまたはパスワードが間違っています。");
    }
  };

  const signInGoogle = async () => {
    await signInWithPopup(auth, provider).catch((error) =>
      alert(error.message)
    );
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser);
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
                  ログイン
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
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
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
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
                    ログイン
                  </Button>

                  <Grid container>
                    <Grid item xs>
                      <Link
                        onClick={() => setOpenModal(true)}
                        href="#"
                        variant="body2"
                      >
                        パスワードリセット
                      </Link>
                    </Grid>

                    <Grid item xs>
                      新規登録は<ReactLink to={"/register/"}>こちら</ReactLink>
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<CameraIcon />}
                    sx={{ mt: 3, mb: 2 }}
                    onClick={signInGoogle}
                  >
                    SignIn with Google
                  </Button>
                </Box>
              </Box>

              <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-description"
                    fontSize={8}
                    sx={{ mt: 2 }}
                  >
                    入力したアドレスにパスワードリセットメールを送信します
                  </Typography>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="email"
                    name="email"
                    label="Reset Email"
                    value={resetEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setResetEmail(e.target.value);
                    }}
                  />
                  <IconButton onClick={sendResetEmail}>
                    <SendIcon />
                  </IconButton>
                </Box>
              </Modal>

              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          </ThemeProvider>
        </>
      )}
      ;
    </>
  );
};

export default Login;
