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

type user = {
  createdAt: string;
  role: number;
  name: string;
  id: number;
  email: string;
  updatedAt: string;
};

// type data = {
//   articles: article[];
// };

// type response = {
//   data: data;
// };

const Users = () => {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<user[]>([]);
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
      .get<article[]>("https://api-blog-dev.lightsail.ijcloud.jp/admin/users", {
        headers: {
          Authorization: "Bearer " + cookies["token"],
          accept: "application/json",
        },
      })
      .then((response: any) => {
        const userList = response.data.users.map((item: any) => ({
          id: item.id,
          name: item.name,
        }));
        console.log("response:");
        console.log(response);
        setUsers(userList);
        console.log(userList);
        console.log(users);
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
                {users.map((user) => {
                  return (
                    <li key={user.id}>
                      <Link to={"/posts/" + user.id}>{user.name}</Link>
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

export default Users;
