import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./components/Users";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Chat from "./components/Chat";
import Test from "./components/Test";

import CreateArticle from "./components/CreateArticle";
import useQueryFirebaseUser from "./hooks/useQueryFirebaseUser";

const Routing = () => {
  useQueryFirebaseUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"test"} element={<Test />} />
        <Route path={"/register/"} element={<Register />} />
        <Route path={"/login/"} element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={"/users/"} element={<Users />} />
          <Route path={"/posts"} element={<Posts />} />
          <Route path={"posts/:postId"} element={<Post />} />
          <Route path={"createarticle"} element={<CreateArticle />} />
          <Route path={"chat"} element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
