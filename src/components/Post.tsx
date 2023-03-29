import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { styled, alpha } from "@mui/material/styles";
import useQueryFirebaseUser from "../hooks/useQueryFirebaseUser";
import InputBase from "@mui/material/InputBase";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import Container from "@mui/material/Container";
import ButtonGroup from "@mui/material/ButtonGroup";
import SearchIcon from "@mui/icons-material/Search";
import ButtonBase from "@mui/material/ButtonBase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@material-ui/core";
import Markdown from "markdown-to-jsx";

type article = {
  id: number;
  title: string;
  categoryId: number;
  content: string;
  createdAt: string;
  thumbnailUrl: string;
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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
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
const Post = () => {
  const { fireBaseUser } = useQueryFirebaseUser();
  const { postId } = useParams();
  const [article, setArticle] = useState<article>({
    id: 1,
    title: "string",
    categoryId: 0,
    content: "string",
    createdAt: "string",
    thumbnailUrl: "string",
    updatedAt: "string",
  });
  const [category, seCategory] = useState<string>();
  const classes = useStyles();

  useEffect(() => {
    getArticleAllInfo();
  }, []);

  // 記事情報取得
  const getArticleAllInfo = async () => {
    console.log(await fireBaseUser?.getIdToken());
    const articleInfo: any = await getArticle();
    const categoryInfo: any = await getCategory(
      articleInfo.data.article.categoryId
    );

    console.log(articleInfo);
    setArticle(articleInfo.data.article);
    seCategory(categoryInfo.data.category.name);

    return articleInfo;
  };

  // カテゴリ以外の記事情報取得
  const getArticle = async () => {
    console.log("fireBaseUser");
    console.log(await fireBaseUser?.getIdToken());
    const response = axios.get<string[]>(
      "https://api-blog-dev.lightsail.ijcloud.jp/articles/" + postId,
      {
        headers: {
          Authorization: "Bearer " + (await fireBaseUser?.getIdToken()),
          accept: "application/json",
        },
      }
    );
    return response;
  };

  // カテゴリ取得
  const getCategory = async (categoryId: string) => {
    // try {
    const response = axios.get<string>(
      "https://api-blog-dev.lightsail.ijcloud.jp/categories/" + categoryId,
      {
        headers: {
          Authorization: "Bearer " + (await fireBaseUser?.getIdToken()),
          accept: "application/json",
        },
      }
    );
    return response;
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Container maxWidth="md">
            <Toolbar>
              <SettingsAccessibilityIcon sx={{ mr: 2 }} />
              My Blog
              <ButtonBase sx={{ ml: "auto" }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                {fireBaseUser?.displayName ? (
                  <Avatar {...stringAvatar(fireBaseUser.displayName || "")} />
                ) : (
                  <AccountCircleIcon />
                )}
              </ButtonBase>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <ButtonGroup variant="text" aria-label="text button group">
            <Button>
              <NavLink to="/">ホーム</NavLink>
            </Button>
            <Button>
              <NavLink to="/users">ユーザー一覧</NavLink>
            </Button>
            <Button>
              <NavLink to="/posts">記事一覧</NavLink>
            </Button>
            <Button>
              <NavLink to={"/createarticle/"}>投稿</NavLink>
            </Button>
          </ButtonGroup>
          <Container maxWidth="md">
            <div>
              <h2>記事詳細</h2>
              <p>ID: {postId}</p>
              <p>カテゴリー：{category}</p>
              <p>タイトル：{article.title}</p>
              <p>
                本文： <Markdown children={article?.content ?? ""} />
              </p>
              <img src={article.thumbnailUrl} alt="picture"></img>
            </div>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md"></Container>
      </main>
    </ThemeProvider>
  );
};

export default Post;
