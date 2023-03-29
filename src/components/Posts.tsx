import React, { useState, useEffect } from "react";
import { styled as muiStyled, alpha } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ButtonGroup from "@mui/material/ButtonGroup";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import SearchIcon from "@mui/icons-material/Search";
import useQueryFirebaseUser from "../hooks/useQueryFirebaseUser";
import axios from "axios";
import styled from "styled-components";
import break_cat_buti from "../assets/break-cat-buti.png";
import no_image from "../assets/no-image.png";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
  border: 1px black solid;
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
      <CssBaseline />
      <StyleContainer>
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
                  <NavLink to={"/posts/" + article.id}>
                    <StyledThumbnail
                      src={
                        article.thumbnailUrl !== "thumbnailUrl"
                          ? `${article.thumbnailUrl}`
                          : `${no_image}`
                      }
                    />
                    <StyledTitle>{article.title}</StyledTitle>
                    <StyledContent>{article.content}</StyledContent>
                  </NavLink>
                </StyledItem>
              );
            })}
          </StyledGridContainer>

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
          <Copyright />
        </Box>
      </StyleContainer>
      {/* End footer */}
    </ThemeProvider>
  );
};

export default Posts;
