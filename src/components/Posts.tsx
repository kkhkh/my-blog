import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useQueryFirebaseUser from "../hooks/useQueryFirebaseUser";
import axios from "axios";
import styled from "styled-components";
import break_cat_buti from "../assets/break-cat-buti.png";
import no_image from "../assets/no-image.png";

type article = {
  id: number;
  title: string;
  categoryId: number;
  content: string;
  createAt: string;
  thumbnailUrl: string;
  updatedAt: string;
};

// ページ全体
const StyledContainer = styled.div`
  width: 1000px;
  margin: auto;
`;

// カテゴリ一覧
const StyledCategories = styled.a`
  display: inline-block;
  margin: 0 0.1em 0.6em 0;
  padding: 0.6em;
  line-height: 1;
  text-decoration: none;
  color: #0080ff;
  text-align: center;
  cursor: pointer;
`;

// 中央寄せ
const StyledCenter = styled.div`
  margin: auto;
  text-align: center;
`;

// タグ一覧
const StyledTags = styled.div`
  display: inline-block;
  margin: 0 0.5em 0.6em 0;
  padding: 0.6em;
  line-height: 1;
  text-decoration: none;
  border: 1px solid #000000;
  border-radius: 0.3em;
`;

// 画像
const StyledImg = styled.img`
  width: 180px;
`;

// グリッド全体
const StyledGridContainer = styled.div`
  display: grid;
  width: auto;
  height: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 400px;
  gap: 10px 20px;
  margin: auto;
  margin-top: 50px;
`;

// 各グリッド
const StyledItem = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px #b7b7be solid;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
    transition-duration: 0.3s;
  }
`;

// 投稿タイトル
const StyledTitle = styled.div`
  font-size: 1.5em;
  margin: 10px;
`;

// 投稿本文
const StyledContent = styled.div`
  margin: 10px;
`;

// 投稿サムネイル
const StyledThumbnail = styled.img`
  width: 100%;
`;

const Posts = () => {
  const [articles, setArticles] = useState<article[]>([]);
  const { fireBaseUser } = useQueryFirebaseUser();
  const [tags, setTags] = useState([
    {
      createdAt: "2014-10-10T04:50:40.000Z",
      name: "tag",
      id: 0,
      updatedAt: "2014-10-10T04:50:40.000Z",
    },
  ]);
  const [categories, setCategories] = useState([
    {
      createdAt: "2014-10-10T04:50:40.000Z",
      name: "categry",
      id: 0,
      updatedAt: "2014-10-10T04:50:40.000Z",
    },
  ]);

  useEffect(() => {
    getAllinfo();
  }, []);

  const getTags = async () => {
    const getTagsResponse = await axios.get(
      "https://api-blog-dev.lightsail.ijcloud.jp/tags"
    );
    setTags(getTagsResponse.data.tags);
  };

  const getCategories = async () => {
    const getCategoriesResponse = await axios.get(
      "https://api-blog-dev.lightsail.ijcloud.jp/categories",
      {
        headers: {
          Authorization: "Bearer " + (await fireBaseUser?.getIdToken()),
          accept: "application/json",
        },
      }
    );
    setCategories(getCategoriesResponse.data.categories);
  };

  const getArticles = async () => {
    const getArticlesResponse = await axios.get(
      "https://api-blog-dev.lightsail.ijcloud.jp/articles",
      {
        headers: {
          Authorization: "Bearer " + (await fireBaseUser?.getIdToken()),
          accept: "application/json",
        },
      }
    );
    console.log({ getArticlesResponse });
    setArticles(getArticlesResponse.data.articles);
  };

  const getAllinfo = async () => {
    console.log(await fireBaseUser?.getIdToken());
    await getTags();
    await getCategories();
    await getArticles();
  };

  function CategryFilter(id: number) {
    const response = articles.filter((article) => {
      return id === article.categoryId;
    });
  }

  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>
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
              <div>
                <StyledCenter>
                  <StyledImg src={break_cat_buti} alt="photo" />
                </StyledCenter>
              </div>
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

          {/* カテゴリ一覧 */}
          <StyledCenter>
            {categories?.map((category, index) => {
              return (
                <React.Fragment key={index}>
                  <StyledCategories onClick={CategryFilter(category.id)}>
                    {category.name}
                  </StyledCategories>
                  {index !== categories.length - 1 && " / "}
                </React.Fragment>
              );
            })}
          </StyledCenter>

          {/* タグ一覧 */}
          <StyledCenter>
            {tags?.map((tag) => {
              return (
                <StyledTags>
                  <i className="fas fa-tag"></i>
                  {tag.name}
                </StyledTags>
              );
            })}
          </StyledCenter>

          {/*投稿一覧 */}
          <StyledGridContainer>
            {articles.map((article) => {
              return (
                <StyledItem key={article.id}>
                  <Link
                    to={"/posts/" + article.id}
                    state={{
                      categoriesName: categories.map(
                        (category) => category.name
                      ),
                      tagsName: tags.map((tag) => tag.name),
                    }}
                    style={{ color: "black" }}
                  >
                    <StyledThumbnail
                      src={
                        article.thumbnailUrl !== "thumbnailUrl"
                          ? `${article.thumbnailUrl}`
                          : `${no_image}`
                      }
                    />
                    <StyledTitle>{article.title}</StyledTitle>
                    <StyledContent>{article.content}</StyledContent>
                  </Link>
                </StyledItem>
              );
            })}
          </StyledGridContainer>
        </main>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default Posts;
