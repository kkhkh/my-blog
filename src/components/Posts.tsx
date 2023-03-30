import React, { useState, useEffect } from "react";
import { styled as muiStyled, alpha } from "@mui/material/styles";
import { NavLink, Link } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ButtonGroup from "@mui/material/ButtonGroup";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import SearchIcon from "@mui/icons-material/Search";
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
const StyleContainer = styled.div`
  width: 1000px;
  margin: auto;
`;

// カテゴリ一覧
const StyledCategories = styled.div`
  display: inline-block;
  margin: 0 0.1em 0.6em 0;
  padding: 0.6em;
  line-height: 1;
  text-decoration: none;
  color: #0080ff;
  text-align: center;
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

const Search = muiStyled("div")(({ theme }) => ({
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

const StyledInputBase = muiStyled(InputBase)(({ theme }) => ({
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

const SearchIconWrapper = muiStyled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const Posts = () => {
  const [articles, setArticles] = useState<article[]>([]);
  const { fireBaseUser } = useQueryFirebaseUser();

  useEffect(() => {
    getAllinfo();
  }, []);

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

  const getTags = async () => {
    const getTagsResponse = await axios.get(
      "https://api-blog-dev.lightsail.ijcloud.jp/tags"
    );
    console.log({ getTagsResponse });
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
    console.log({ getCategoriesResponse });
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

  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <StyleContainer>
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
                  <StyledCategories>{category.name}</StyledCategories>
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
      </StyleContainer>
    </ThemeProvider>
  );
};

export default Posts;
