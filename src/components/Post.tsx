import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import useQueryFirebaseUser from "../hooks/useQueryFirebaseUser";
import Markdown from "markdown-to-jsx";
import styled from "styled-components";
import no_image from "../assets/no-image.png";

type article = {
  id: number;
  title: string;
  categoryId: number;
  content: string;
  createdAt: string;
  thumbnailUrl: string;
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
  background-color: #fff;
  grid-column: 1 / 2;
  padding: 20px;
`;

// サイドバー
const StyledSidebar = styled.div`
  background-color: #f2f2f2;
  grid-column: 2 / 3;
  padding: 20px;
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
  const [category, seCategory] = useState<string>();

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
    <StyledContainer>
      <StyledGridContainer>
        <StyledBody>
          <h2>{article.title}</h2>
          <h3>
            {new Date(article.createdAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <p>ID: {postId}</p>
          <p>カテゴリー：{category}</p>

          <p>
            本文： <Markdown children={article?.content ?? ""} />
          </p>
          <img
            src={
              article.thumbnailUrl !== "thumbnailUrl"
                ? `${article.thumbnailUrl}`
                : `${no_image}`
            }
          ></img>
        </StyledBody>

        <StyledSidebar>
          {/* ここにサイドバーのコンテンツを追加 */}
        </StyledSidebar>
      </StyledGridContainer>
    </StyledContainer>
  );
};

export default Post;
