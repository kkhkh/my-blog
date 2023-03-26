import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import { auth } from "../FirebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { useCookies } from "react-cookie";

type article = {
  id: number;
  categoryId: number;
  content: string;
  createAt: string;
  thumbnailUrl: string;
  updatedAt: string;
};

// type data = {
//   articles: article[];
// };

// type response = {
//   data: data;
// };

const Posts_org = () => {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<article[]>([]);
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    console.log(auth);
    console.log(cookies["token"]);

    // 記事一覧取得
    axios
      .get<article[]>("https://api-blog-dev.lightsail.ijcloud.jp/articles", {
        headers: {
          Authorization: "Bearer " + cookies["token"],
          accept: "application/json",
        },
      })
      .then((response: any) => {
        const articleList = response.data.articles.map((item: any) => ({
          id: item.id,
          content: item.content,
        }));
        console.log("response:");
        console.log(response);
        setArticles(articleList);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);

  return (
    <>
      {/* 「loading」がfalseの時にマイページを表示する */}
      {!loading && (
        <>
          {/* ログインしていない場合はログインページにリダイレクト */}
          {!user ? (
            <Navigate to={"/login/"} />
          ) : (
            <>
              <p>
                {articles.map((article) => {
                  return (
                    <li key={article.id}>
                      <Link to={"/posts/" + article.id}>{article.content}</Link>
                    </li>
                  );
                })}
              </p>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Posts_org;
