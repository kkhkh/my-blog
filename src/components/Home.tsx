import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { useNavigate, Navigate, Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

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
              <p>{user?.email}</p>
              <p>
                <Link to={"/createarticle/"}>投稿</Link>
              </p>
              <button onClick={logout}>ログアウト</button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
