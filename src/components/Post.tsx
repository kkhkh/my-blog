import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../FirebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import axios from "axios";
import { useCookies } from "react-cookie";

const Post = () => {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();
  const [article, setArticle] = useState<any>();
  const [category, seCategory] = useState<string>();
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    console.log(cookies["token"]);

    getArticleAllInfo();
  }, []);

  const getArticleAllInfo = async () => {
    const articleInfo: any = await getArticle();
    const categoryInfo: any = await getCategory(
      articleInfo.data.article.categoryId
    );

    console.log(articleInfo);
    setArticle(articleInfo.data.article);
    seCategory(categoryInfo.data.category.name);

    return articleInfo;
  };

  const getArticle = () => {
    // try {
    const response = axios.get<string[]>(
      "https://api-blog-dev.lightsail.ijcloud.jp/articles/" + postId,
      {
        headers: {
          Authorization: "Bearer " + cookies["token"],
          accept: "application/json",
        },
      }
    );
    return response;
  };
  const getCategory = (categoryId: string) => {
    // try {
    const response = axios.get<string>(
      "https://api-blog-dev.lightsail.ijcloud.jp/categories/" + categoryId,
      {
        headers: {
          Authorization: "Bearer " + cookies["token"],
          accept: "application/json",
        },
      }
    );
    return response;
  };
  return (
    <div>
      <h2>記事詳細</h2>
      <p>ID: {postId}</p>
      <p>カテゴリー：{category}</p>
      <p>タイトル：{article.title}</p>
      <p>本文：{article.content}</p>
      <img src={article.thumbnailUrl} alt="picture"></img>
    </div>
  );
};

export default Post;
