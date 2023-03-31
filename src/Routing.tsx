import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./components/Users";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Chat from "./components/Chat";
import CreateArticle from "./components/CreateArticle";
import useQueryFirebaseUser from "./hooks/useQueryFirebaseUser";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Routing = () => {
  const { fireBaseUser } = useQueryFirebaseUser();
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/register/"} element={<Register />} />
        <Route path={"/login/"} element={<Login />} />
        <Route index element={<Home />} />
        <Route path={"/users/"} element={<Users />} />
        <Route path={"/posts"} element={<Posts />} />
        <Route path={"posts/:postId"} element={<Post />} />
        <Route path={"createarticle"} element={<CreateArticle />} />
        <Route path={"chat"} element={<Chat />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Routing;
