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
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

type StyledTagProps = {
  active: boolean;
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
const StyledTags = styled.div<StyledTagProps>`
  display: inline-block;
  margin: 0 0.5em 0.6em 0;
  padding: 0.6em;
  line-height: 1;
  text-decoration: none;
  border: 1px solid #000000;
  border-radius: 0.4em;
  cursor: pointer;
  color: ${(props) => (props.active ? "#fff" : "#000")};
  background-color: ${(props) => (props.active ? "#000" : "#fff")};
  &:hover {
    transition: 0.3s;
    border: 1px solid #fff;
    color: #fff;
    background-color: #000;
  }
`;

const ActiveStyledTag = styled(StyledTags)`
  color: #fff;
  background-color: #000;
  border: 1px solid #fff;
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
  const { fireBaseUser } = useQueryFirebaseUser();
  const [articles, setArticles] = useState<article[] | null>();
  const [tags, setTags] = useState<tag[] | null>();
  const [categories, setCategories] = useState<category[] | null>();
  const [activeTag, setActiveTag] = useState<tag | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    setArticles(queryClient.getQueryData<article[] | null>(["articles"]));
    setTags(queryClient.getQueryData<tag[] | null>(["tags"]));
    setCategories(queryClient.getQueryData<category[] | null>(["categories"]));
  }, []);

  // カテゴリーでフィルター
  function CategoryFilter(id: number) {
    const articles = queryClient.getQueryData<article[] | null>(["articles"]);
    const response = articles?.filter(
      (article: article) => article.categoryId === id
    );
    setArticles(response);
  }

  // タグでフィルター
  function TagFilter(id: number) {
    const articles = queryClient.getQueryData<article[] | null>(["articles"]);
    const tags = queryClient.getQueryData<tag[] | null>(["tags"]);
    // const response = tags
    //   ?.filter((tag) => tag.id === id)
    //   .flatMap((tag) => tag.articlIds);
    // console.log(response);
    // setArticles(response);
  }

  const handleTagClick = (tag: tag) => {
    setActiveTag(tag === activeTag ? null : tag);
    TagFilter(tag.id);
  };

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
            {categories?.map((category: category, index) => {
              return (
                <React.Fragment key={index}>
                  {/* <StyledCategories> */}
                  <StyledCategories onClick={() => CategoryFilter(category.id)}>
                    {category.name}
                  </StyledCategories>
                  {index !== categories.length - 1 && " / "}
                </React.Fragment>
              );
            })}
          </StyledCenter>

          {/* タグ一覧 */}
          <StyledCenter>
            {tags?.map((tag: tag) => {
              return (
                <StyledTags
                  key={tag.id}
                  active={tag === activeTag}
                  onClick={() => handleTagClick(tag)}
                >
                  <i className="fas fa-tag"></i>
                  {tag.name}
                </StyledTags>
              );
            })}
          </StyledCenter>

          {/*投稿一覧 */}
          <StyledGridContainer>
            {articles?.map((article: article) => {
              return (
                <StyledItem key={article.id}>
                  <Link to={"/posts/" + article.id} style={{ color: "black" }}>
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
