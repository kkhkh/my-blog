import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { Navigate, NavLink } from "react-router-dom";
import axios from "axios";
import useQueryFirebaseUser from "../hooks/useQueryFirebaseUser";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

const StyledSignUpForm = styled.div`
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

const StyledSignUpFormItem = styled.div`
  margin-bottom: 0.75em;
  width: 100%;
`;

const StyledSignUpInput = styled.input.attrs({ required: true })`
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
`;

const StyledSignUpButtonPanel = styled.div`
  margin: 2em 0 0;
  width: 100%;
`;

const StyledSignUpButtonPanelButton = styled.input`
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

const StyledSignUpFooter = styled.div`
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

const Register = () => {
  const [userName, setUserName] = useState("");
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
          name: userName,
          email: signupEmail,
          password: signupPassword,
        },
        {
          headers: {
            Authorization: "Bearer " + fireBaseUser?.getIdToken(),
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
          <StyledSignUpForm>
            <h1>SignUp</h1>
            <form>
              <StyledSignUpFormItem>
                <label htmlFor="username"></label>
                <StyledSignUpInput
                  type="test"
                  name="username"
                  placeholder="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                ></StyledSignUpInput>
              </StyledSignUpFormItem>
              <StyledSignUpFormItem>
                <label htmlFor="email"></label>
                <StyledSignUpInput
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                ></StyledSignUpInput>
              </StyledSignUpFormItem>
              <StyledSignUpFormItem>
                <label htmlFor="password"></label>
                <StyledSignUpInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                ></StyledSignUpInput>
              </StyledSignUpFormItem>
              <StyledSignUpButtonPanel>
                <StyledSignUpButtonPanelButton
                  type="submit"
                  title="Sign Up"
                  value="Sign Up"
                  onClick={handleSubmit}
                ></StyledSignUpButtonPanelButton>
              </StyledSignUpButtonPanel>
            </form>
            <StyledSignUpFooter>
              <p>
                <NavLink to="/login/">
                  Already have login and password? Sign in
                </NavLink>
              </p>
            </StyledSignUpFooter>
          </StyledSignUpForm>
          <CssBaseline />
        </>
      )}
      ;
    </>
  );
};

export default Register;
