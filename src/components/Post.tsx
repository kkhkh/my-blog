import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import useQueryFirebaseUser from "../hooks/useQueryFirebaseUser";
import Markdown from "markdown-to-jsx";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import no_image from "../assets/no-image.png";
import jwImage from "../assets/jw_side.png";
import autoImage from "../assets/auto_side.png";

type article = {
  id: number;
  title: string;
  categoryId: number;
  content: string;
  createdAt: string;
  thumbnailUrl: string;
  updatedAt: string;
};

type tags = {
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
};

// ページ全体
const StyledContainer = styled.div`
  width: 1000px;
  margin: auto;
`;

// グリッド全体
const StyledGridContainer = styled.div`
  display: grid;
  margin-top: 20px;
  grid-template-columns: 1fr 1fr 1fr 1.5fr;
  grid-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// ボディ
const StyledBody = styled.div`
  background-color: #f2f7ea;
  grid-row: 1 / 3;
  grid-column: 1 / 4;
  padding: 20px;
  img {
    width: 100%;
  }
`;

const StyledFavoriteLeft = styled.div`
  background-color: #f2f7ea;
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  img {
    width: 100%;
  }
  .title {
    font-size: 20ox;
    font-weight: bold;
    padding: 10px;
  }
  .content {
    font-size: 15ox;
    font-weight: bold;
    padding: 10px;
  }
`;

const StyledFavoriteCenter = styled.div`
  background-color: #f2f7ea;
  grid-row: 3 / 4;
  grid-column: 2 / 3;
  img {
    width: 100%;
  }
  .title {
    font-size: 20ox;
    font-weight: bold;
    padding: 10px;
  }
  .content {
    font-size: 15ox;
    font-weight: bold;
    padding: 10px;
  }
`;

const StyledFavoriteRight = styled.div`
  background-color: #f2f7ea;
  grid-row: 3 / 4;
  grid-column: 3 / 4;
  img {
    width: 100%;
  }
  .title {
    font-size: 20ox;
    font-weight: bold;
    padding: 10px;
  }
  .content {
    font-size: 15ox;
    font-weight: bold;
    padding: 10px;
  }
`;

// サイドバー
const StyledSidebarContainerTop = styled.div`
  background-color: #f2f2f2;
  grid-row: 1 / 2;
  grid-column: 4 / 5;
`;

const StyledSidebarContainer = styled.div`
  background-color: #f2f2f2;
  grid-row: 2 / 3;
  grid-column: 4 / 5;
  padding: 20px;
`;

const StyledSidebarContainerBottom = styled.div`
  background-color: #f2f2f2;
  grid-row: 3 / 4;
  grid-column: 4 / 5;
`;

// カテゴリーメニュー
const StyledSidebarCategoryMenu = styled.div`
  margin-bottom: 50px;
  .menu {
    color: #fff;
    background: #e9727e;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
  }
  ul {
    list-style: none;
    padding-left: 0;
  }
  li {
    color: #fff;
    padding: 5px;
    border-bottom: 1px dashed #999;
    a {
      color: #000;
      font-weight: bold;
    }
  }
`;

// 人気記事ランキング
const StyledSidebarRanking = styled.div`
  .menu {
    color: #fff;
    background: #e9727e;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 10px;
  }

  h4 {
    margin-top: 0px;
    border-bottom: 1px dashed #999;
    padding-bottom: 20px;
    text-decoration: underline;
  }
  img {
    width: 100%;
    border-radius: 5px;
  }
`;

// 新規記事一覧
const StyledSidebarNew = styled.div`
  .menu {
    color: #fff;
    background: #e9727e;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 10px;
  }
  .article {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px dashed #999;
    padding: 10px;
    img {
      width: 100px;
      height: 80px;
      object-fit: cover;
      margin-right: 10px;
    }
  }

  h4 {
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    margin: 0;
    text-decoration: underline;
  }
`;

// タグメニュー
const StyledSidebarTags = styled.div`
  .menu {
    color: #fff;
    background: #e9727e;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    margin-top: 20px;
  }
`;

// タグ
const StyledTags = styled.div`
  display: inline-block;
  margin: 0 0.5em 0.6em 0;
  padding: 0.6em;
  line-height: 1;
  text-decoration: none;
  border: 1px solid #000000;
  border-radius: 0.3em;
`;

// おすすめ記事

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
  const [category, setCategory] = useState<string>();
  const [tags, setTags] = useState<tags[]>();
  const [categoriesName, setCategoriesName] = useState<string[]>();
  const [tagsName, setTagsName] = useState<string[]>();
  const location = useLocation();

  // カテゴリーメニューとタグメニューの一覧を取得
  useEffect(() => {
    console.log(location.state);
    if (location.state) {
      if (location.state.categoriesName) {
        const { categoriesName } = location.state;
        setCategoriesName(categoriesName);
      }
      if (location.state.tagsName) {
        const { tagsName } = location.state;
        setTagsName(tagsName);
        console.log(tagsName);
      }
    }
  }, [location.state]);

  // 記事の詳細を取得
  useEffect(() => {
    getArticleAllInfo();
  }, []);

  const getArticleAllInfo = async () => {
    console.log(await fireBaseUser?.getIdToken());
    const articleInfo: any = await getArticle();
    const tagsInfo: any = await getTags();
    const categoryInfo: any = await getCategory(
      articleInfo.data.article.categoryId
    );

    console.log(tagsInfo.data.tags);
    setArticle(articleInfo.data.article);
    setTags(tagsInfo.data.tags);
    setCategory(categoryInfo.data.category.name);

    return articleInfo;
  };

  // カテゴリ以外の記事情報取得
  const getArticle = async () => {
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

  // 記事にアタッチされたタグ一覧取得
  const getTags = async () => {
    // try {
    const response = axios.get<string>(
      "https://api-blog-dev.lightsail.ijcloud.jp/articles/" + postId + "/tags",
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
    <StyledContainer>
      <StyledGridContainer>
        <StyledBody>
          <h1>{article.title}</h1>
          <h3>
            {new Date(article.createdAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
          {tags?.map((tag) => {
            return (
              <StyledTags>
                <i className="fas fa-tag"></i>
                {tag.name}
              </StyledTags>
            );
          })}
          <img
            src={
              article.thumbnailUrl !== "thumbnailUrl"
                ? `${article.thumbnailUrl}`
                : `${no_image}`
            }
          />

          <p>
            本文： <Markdown children={article?.content ?? ""} />
          </p>
        </StyledBody>
        <StyledFavoriteLeft>
          <img
            src={
              article.thumbnailUrl !== "thumbnailUrl"
                ? `${article.thumbnailUrl}`
                : `${no_image}`
            }
          />
          <div className="title">{article.title}</div>
          <div className="content">{article.content}</div>
        </StyledFavoriteLeft>
        <StyledFavoriteCenter>
          <img
            src={
              article.thumbnailUrl !== "thumbnailUrl"
                ? `${article.thumbnailUrl}`
                : `${no_image}`
            }
          />
          <div className="title">{article.title}</div>
          <div className="content">{article.content}</div>
        </StyledFavoriteCenter>
        <StyledFavoriteRight>
          <img
            src={
              article.thumbnailUrl !== "thumbnailUrl"
                ? `${article.thumbnailUrl}`
                : `${no_image}`
            }
          />
          <div className="title">{article.title}</div>
          <div className="content">{article.content}</div>
        </StyledFavoriteRight>
        <StyledSidebarContainerTop>
          <img src={jwImage} />
        </StyledSidebarContainerTop>
        <StyledSidebarContainer>
          <StyledSidebarCategoryMenu>
            <div className="menu">カテゴリーメニュー</div>
            <ul>
              {categoriesName?.map((name) => {
                return (
                  <li key={name}>
                    <NavLink to={"/category/" + name}>{name}</NavLink>
                  </li>
                );
              })}
            </ul>
          </StyledSidebarCategoryMenu>
          <StyledSidebarRanking>
            <div className="menu">人気記事ランキング</div>

            <img
              src={
                article.thumbnailUrl !== "thumbnailUrl"
                  ? `${article.thumbnailUrl}`
                  : `${no_image}`
              }
            />
            <h4>{article.title}</h4>

            <img
              src={
                article.thumbnailUrl !== "thumbnailUrl"
                  ? `${article.thumbnailUrl}`
                  : `${no_image}`
              }
            />
            <h4>{article.title}</h4>

            <img
              src={
                article.thumbnailUrl !== "thumbnailUrl"
                  ? `${article.thumbnailUrl}`
                  : `${no_image}`
              }
            />
            <h4>{article.title}</h4>
          </StyledSidebarRanking>
          <StyledSidebarNew>
            <div className="menu">新規記事一覧</div>
            <div className="article">
              <img
                src={
                  article.thumbnailUrl !== "thumbnailUrl"
                    ? `${article.thumbnailUrl}`
                    : `${no_image}`
                }
              />
              <h4>{article.title}</h4>
            </div>
            <div className="article">
              <img
                src={
                  article.thumbnailUrl !== "thumbnailUrl"
                    ? `${article.thumbnailUrl}`
                    : `${no_image}`
                }
              />
              <h4>{article.title}</h4>
            </div>{" "}
            <div className="article">
              <img
                src={
                  article.thumbnailUrl !== "thumbnailUrl"
                    ? `${article.thumbnailUrl}`
                    : `${no_image}`
                }
              />
              <h4>{article.title}</h4>
            </div>
          </StyledSidebarNew>
          <StyledSidebarTags>
            <div className="menu">タグメニュー</div>
            <div style={{ padding: "10px" }}>
              {tagsName?.map((name) => {
                return (
                  <StyledTags>
                    <i className="fas fa-tag"></i>
                    {name}
                  </StyledTags>
                );
              })}
            </div>
          </StyledSidebarTags>
        </StyledSidebarContainer>
        <StyledSidebarContainerBottom>
          <img src={autoImage} />
        </StyledSidebarContainerBottom>
      </StyledGridContainer>
    </StyledContainer>
  );
};

export default Post;
