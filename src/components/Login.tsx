import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CameraIcon from "@material-ui/icons/Camera";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@mui/icons-material/Close";
import useQueryFirebaseUser from "../hooks/useQueryFirebaseUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged,
  getAuth,
  User,
} from "firebase/auth";
import { auth, provider } from "../FirebaseConfig";
// import { useAuthState } from "react-firebase-hooks/auth";

import { Navigate, Link as ReactLink } from "react-router-dom";
import Modal from "react-modal";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "40%",
  },
};

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [resetEmail, setResetEmail] = useState("");

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
  const queryClient = useQueryClient();
  // ログイン
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        queryClient.setQueryData(["fireBaseUser"], userCredential);
        console.log(userCredential.user.getIdToken());
      })
      .catch((error) => alert(error.message));
    console.log(auth);
  };

  // signin with google
  const signInGoogle = async () => {
    await signInWithPopup(auth, provider).catch((error) =>
      alert(error.message)
    );
  };

  const { fireBaseUser } = useQueryFirebaseUser();
  useEffect(() => {
    console.log(fireBaseUser);
  }, []);

  const classes = useStyles();

  return (
    <>
      {fireBaseUser ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                ログイン
              </Typography>
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
                  color="primary"
                  className={classes.submit}
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
                    新規登録は
                    <ReactLink to={"/register/"}>こちら</ReactLink>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<CameraIcon />}
                  onClick={signInGoogle}
                >
                  SignIn with Google
                </Button>

                <Modal isOpen={openModal} style={customStyles}>
                  <Typography id="modal-modal-description">
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
                  <CloseIcon onClick={() => setOpenModal(false)}></CloseIcon>
                </Modal>
              </form>
            </div>

            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        </>
      )}
      ;
    </>
  );
};

export default Login;
