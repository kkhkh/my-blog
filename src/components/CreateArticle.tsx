import { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import Stack from "@mui/material/Stack";
import useQueryFirebaseUser from "../hooks/useQueryFirebaseUser";

const API_URL = "https://api.openai.com/v1/";
const MODEL = "gpt-3.5-turbo";
const API_KEY = "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";

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

const CreateArticle = () => {
  // 会話の記録用のステート
  const [conversation, setConversation] = useState<any>([]);
  // ローディング表示用のステート
  const [loading, setLoading] = useState(false);
  // 前回のメッセージの保持、比較用
  const prevMessageRef = useRef("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

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

    // メッセージの消去(フォームのクリア)
    // setTitle("");
  }, [content]);

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

  const { fireBaseUser } = useQueryFirebaseUser();

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

  const classes = useStyles();

  // フォームの表示
  return (
    <main>
      <Grid container>
        <Grid sm={2} />
        <Grid lg={4} sm={4} spacing={4}>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
              <Button variant="outlined" color="primary" onClick={handleSubmit}>
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
  );
};

export default CreateArticle;
