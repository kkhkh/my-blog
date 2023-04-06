import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useQueryFirebaseUser from "../hooks/useQueryFirebaseUser";
import { makeStyles } from "@material-ui/core";
import useMutateArticles from "../hooks/useMutateArticles";
import useMutateTags from "../hooks/useMutateTags";
import useMutateCategories from "../hooks/useMutateCategories";

type article = {
  id: number;
  title: string;
  categoryId: number;
  content: string;
  createAt: string;
  thumbnailUrl: string;
  updatedAt: string;
};

type tag = {
  createAt: string;
  name: string;
  id: number;
  updatedAt: string;
};

type category = {
  createAt: string;
  name: string;
  id: number;
  updatedAt: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1567225591450-06036b3392a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8JUU2JTlGJUI0JUU3JThBJUFDfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
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

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.charAt(0)}`,
  };
}

const theme = createTheme();

const Home = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };
  const { fireBaseUser } = useQueryFirebaseUser();
  const { setArticlesMutation } = useMutateArticles();
  const { setTagsMutation } = useMutateTags();
  const { setCategoriesMutation } = useMutateCategories();

  const setArticles = async () => {
    setArticlesMutation.mutate();
    setTagsMutation.mutate();
    const token = await fireBaseUser?.getIdToken();
    setCategoriesMutation.mutate(token);
  };

  useEffect(() => {
    setArticles();
  }, []);

  return (
    <>
      {!fireBaseUser ? (
        <Navigate to={"/login"} />
      ) : (
        <>
          <ThemeProvider theme={theme}>
            <main>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  pt: 8,
                  pb: 6,
                }}
              >
                <Container maxWidth="md">
                  <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    color="text.primary"
                    gutterBottom
                  >
                    My blog
                  </Typography>

                  <Typography
                    variant="h6"
                    align="center"
                    color="text.secondary"
                    paragraph
                  >
                    {fireBaseUser.email}
                  </Typography>
                  <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    paragraph
                  >
                    <Button onClick={logout}>ログアウト</Button>
                  </Typography>

                  <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                  ></Stack>
                </Container>
              </Box>
              <Container sx={{ py: 8 }} maxWidth="md"></Container>
            </main>
          </ThemeProvider>
        </>
      )}
    </>
  );
};

export default Home;
