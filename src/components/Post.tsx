import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import useQueryFirebaseUser from "../hooks/useQueryFirebaseUser";
import Markdown from "markdown-to-jsx";
import styled from "styled-components";
import no_image from "../assets/no-image.png";
import { useLocation } from "react-router-dom";

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
  grid-template-columns: 2fr 1fr;
  grid-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// ボディ
const StyledBody = styled.div`
  background-color: #f2f7ea;
  grid-column: 1 / 2;
  padding: 20px;
  img {
    width: 100%;
  }
`;

// サイドバー
const StyledSidebarContainer = styled.div`
  background-color: #f2f2f2;
  grid-column: 2 / 3;
  padding: 20px;
`;

const StyledSidebarCategoryMenu = styled.div`
  margin-bottom: 50px;
  div {
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

// 投稿画像
const StyledThumbnail = styled.img`
  width: 100%;
`;

const StyledSidebarRanking = styled.div`
  padding: 5px;
  border-bottom: 1px dashed #999;
  div {
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
    padding-bottom: 10px;
  }
  img {
    width: 100%;
    border-radius: 5px;
  }
`;

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
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
    if (location.state && location.state.categoriesName) {
      const { categoriesName } = location.state;
      setCategoriesName(categoriesName);
    }
  }, [location.state]);

  useEffect(() => {
    getArticleAllInfo();
  }, []);

  // 記事情報取得
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
          ></img>

          <p>
            本文： <Markdown children={article?.content ?? ""} />
          </p>
        </StyledBody>

        <StyledSidebarContainer>
          <StyledSidebarCategoryMenu>
            <div>カテゴリーメニュー</div>
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
            <div>人気記事ランキング</div>
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
        </StyledSidebarContainer>
      </StyledGridContainer>
    </StyledContainer>
  );
};

export default Post;
