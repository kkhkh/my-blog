import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useQueryFirebaseUser from "../hooks/useQueryFirebaseUser";
import axios from "axios";

type article = {
  id: number;
  title: string;
  categoryId: number;
  content: string;
  createAt: string;
  thumbnailUrl: string;
  updatedAt: string;
};

const Posts = () => {
  const [articles, setArticles] = useState<article[]>([]);
  const { fireBaseUser } = useQueryFirebaseUser();

  useEffect(() => {
    (async () => {
      axios
        .get<article[]>("https://api-blog-dev.lightsail.ijcloud.jp/articles", {
          headers: {
            Authorization: "Bearer " + (await fireBaseUser?.getIdToken()),
            accept: "application/json",
          },
        })
        .then((response: any) => {
          const articleList = response.data.articles.map((item: any) => ({
            id: item.id,
            title: item.title,
            categoryId: item.categoryId,
            content: item.content,
            createAt: item.createAt,
            thumbnailUrl: item.thumbnailUrl,
            updatedAt: item.updateAt,
          }));
          console.log("response:");
          console.log(response);
          console.log(articleList);
          setArticles(articleList);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  return (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            投稿一覧
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained">Main call to action</Button>
            <Button variant="outlined">Secondary action</Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {articles.map((article) => {
            return (
              <Grid item key={article.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image={article.thumbnailUrl}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      <Button>
                        <NavLink to={"/posts/" + article.id}>
                          {article.title}
                        </NavLink>
                      </Button>
                    </Typography>
                    <Typography>{article.content}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </main>
  );
};

export default Posts;
