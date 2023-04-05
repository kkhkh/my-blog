import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CameraIcon from "@material-ui/icons/Camera";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  User,
} from "firebase/auth";
import { auth, provider } from "../FirebaseConfig";

import { Navigate, NavLink } from "react-router-dom";
import Modal from "react-modal";

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

const StyledLoginForm = styled.div`
  background: #fafafa;
  margin: 3em auto;
  padding: 0 1em;
  max-width: 370px;
  h1 {
    text-align: center;
    padding: 1em 0;
  }
  form {
    padding: 0 1.5em;
  }
`;

const StyledLoginFormItem = styled.div`
  margin-bottom: 0.75em;
  width: 100%;
  input {
    background: #fafafa;
    border: none;
    border-bottom: 2px solid #e9e9e9;
    color: #666;
    font-family: "Open Sans", sans-serif;
    font-size: 1em;
    height: 50px;
    transition: border-color 0.3s;
    width: 100%;

    &:focus {
      border-bottom: 2px solid #c0c0c0;
      outline: none;
    }
  }
  .error {
    color: red;
  }
`;

const StyledLoginButtonPanel = styled.div`
  margin: 2em 0 0;
  width: 100%;
`;

const StyledLoginButtonPanelButton = styled.input`
  background: #eb838f;
  border: none;
  color: #fff;
  cursor: pointer;
  height: 50px;
  font-family: "Open Sans", sans-serif;
  font-size: 1.2em;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
  transition: background 0.3s ease-in-out;
  width: 100%;
  &:hover {
    background: #dd6d7a;
  }
`;

const StyledLoginFooter = styled.div`
  font-size: 1em;
  padding: 2em 0;
  text-align: center;
  a {
    color: #8c8c8c;
    text-decoration: none;
    transition: border-color 0.3s;
    &:hover {
      border-bottom: 1px dotted #8c8c8c;
    }
  }
`;

interface IFormInput {
  email: string;
  password: string;
  email_confirmation: string;
}

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<IFormInput>();

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
  const onSubmit = async (data: any) => {
    console.log(data);
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        queryClient.setQueryData(["fireBaseUser"], userCredential);
        console.log("IdToken");
        console.log(userCredential.user.getIdToken());
      })
      .catch((error) => alert(error.message));
  };

  // signin with google
  const signInGoogle = async () => {
    await signInWithPopup(auth, provider).catch((error) =>
      alert(error.message)
    );
  };

  const fireBaseUser = queryClient.getQueryData<User | null>(["fireBaseUser"]);

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
          <StyledLoginForm>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <StyledLoginFormItem>
                <label htmlFor="email"></label>
                <input
                  id="email"
                  {...register("email", {
                    required: "必須項目です",
                    onBlur: () => {
                      if (getValues("email_confirmation")) {
                        trigger("email_confirmation");
                      }
                    },
                    pattern: {
                      value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                      message: "入力形式がメールアドレスではありません。",
                    },
                  })}
                />
                {errors.email?.message && (
                  <div className="error">{errors.email.message}</div>
                )}
              </StyledLoginFormItem>
              <StyledLoginFormItem>
                <label htmlFor="password"></label>

                <input
                  id="password"
                  {...register("password", { required: "必須項目です" })}
                />
                {errors.password?.message && (
                  <div className="error">{errors.password.message}</div>
                )}
              </StyledLoginFormItem>
              <StyledLoginButtonPanel>
                <StyledLoginButtonPanelButton
                  type="submit"
                  title="Sign In"
                  value="Sign In"
                ></StyledLoginButtonPanelButton>
              </StyledLoginButtonPanel>
            </form>
            <StyledLoginFooter>
              <p>
                <NavLink to="/register/">Create an account</NavLink>
              </p>
              <p>
                <a href="#" onClick={() => setOpenModal(true)}>
                  Forgot password?
                </a>
              </p>
            </StyledLoginFooter>
          </StyledLoginForm>

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

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
          </Container>
        </>
      )}
      ;
    </>
  );
};

export default Login;
