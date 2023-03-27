import React, { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import { styled, alpha } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ButtonGroup from "@mui/material/ButtonGroup";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import SearchIcon from "@mui/icons-material/Search";
import Chip from "@mui/material/Chip";
import { makeStyles } from "@material-ui/core/styles";
import Stack from "@mui/material/Stack";
import useQueryFirebaseUser from "../hooks/useQueryFirebaseUser";

const API_URL = "https://api.openai.com/v1/";
const MODEL = "gpt-3.5-turbo";
const API_KEY = "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";

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

type tag = {
  createdAt: string;
  name: string;
  id: number;
  updatedAt: string;
};
type AutocompleteOption = string;
const CreateArticle = () => {
  // 会話の記録用のステート
  const [conversation, setConversation] = useState<any>([]);
  // ローディング表示用のステート
  const [loading, setLoading] = useState(false);
  const [tagsLoading, setTagsLoading] = useState(false);
  // 前回のメッセージの保持、比較用
  const prevMessageRef = useRef("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const tagsArray = [
    { title: " Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];

  const [tags, setTags] = useState([
    {
      createdAt: "2014-10-10T04:50:40.000Z",
      name: "name",
      id: 0,
      updatedAt: "2014-10-10T04:50:40.000Z",
    },
  ]);
  const { fireBaseUser } = useQueryFirebaseUser();
  // 回答が取得されたとき
  useEffect(() => {
    // 直前のチャット内容
    const newConversation = [
      {
        role: "assistant",
        content: content,
      },
      {
        role: "user",
        content: title,
      },
    ];

    // 会話の記録(直前のチャット内容の追加)
    setConversation([...conversation, ...newConversation]);
  }, [content]);

  const getTags = async () => {
    setTagsLoading(true);

    const getTagsResponse = await axios.get(
      "https://api-blog-dev.lightsail.ijcloud.jp/tags"
    );
    console.log({ getTagsResponse });
    setTags(getTagsResponse.data.tags);
    setLoading(false);
  };

  useEffect(() => {
    // タグ一覧取得
    getTags();
    console.log(tags);
  }, []);

  // フォーム送信時の処理
  const handleSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();

      // フォームが空のとき
      console.log(title);
      if (!title) {
        alert("メッセージがありません。");
        return;
      }

      // APIリクエスト中はスルー
      if (loading) return;

      // APIリクエストを開始する前にローディング表示を開始
      setLoading(true);

      try {
        // API リクエスト
        const response = await axios.post(
          `${API_URL}chat/completions`,
          {
            model: MODEL,
            messages: [
              ...conversation,
              {
                role: "user",
                content: title,
              },
            ],
          },
          {
            // HTTPヘッダー(認証)
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );
        console.log(response);
        // 回答の取得
        setContent(response.data.choices[0].message.content.trim());
      } catch (error) {
        // エラーハンドリング
        console.error(error);
      } finally {
        // 後始末
        setLoading(false); // ローディング終了
        prevMessageRef.current = title; // 今回のメッセージを保持
      }
    },
    [loading, title, conversation]
  );

  // signin with google
  const postArticle = async () => {
    axios
      .post(
        "https://api-blog-dev.lightsail.ijcloud.jp/articles",
        {
          title: title,
          content: content,
          categoryId: categoryId,
          thumbnailUrl: thumbnailUrl,
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

  interface MemoProps {
    prevMessage: string;
    answer: string;
  }

  const theme = createTheme();
  const classes = useStyles();

  // フォームの表示
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AppBar position="relative"> */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <SettingsAccessibilityIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap></Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
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
      <main>
        <Grid container>
          <Grid sm={2} />
          <Grid lg={4} sm={4} spacing={4}>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={tagsArray}
                defaultValue={[tagsArray[1]]}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Multiple values"
                    placeholder="Favorites"
                  />
                )}
              />

              <TextField
                name="titile"
                label="Title"
                id="title"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <TextField
                label="Content"
                fullWidth
                margin="normal"
                id="content"
                multiline
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></TextField>

              <Stack spacing={2} direction="row">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleSubmit}
                >
                  本文自動生成
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={postArticle}
                >
                  投稿
                </Button>
              </Stack>
            </form>
          </Grid>
        </Grid>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        ></Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
};

export default CreateArticle;
