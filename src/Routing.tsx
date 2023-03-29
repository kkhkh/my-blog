import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./components/Users";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Chat from "./components/Chat";
import GridLayout from "./components/GridLayout";
import GridLayout2 from "./components/GridLayout2";
import CreateArticle from "./components/CreateArticle";
import useQueryFirebaseUser from "./hooks/useQueryFirebaseUser";

const Routing = () => {
  const { fireBaseUser } = useQueryFirebaseUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/register/"} element={<Register />} />
        <Route path={"/login/"} element={<Login />} />
        {/* <Route path="/" element={<Layout />}> */}
        <Route index element={<Home />} />
        <Route path={"/users/"} element={<Users />} />
        <Route path={"/posts"} element={<Posts />} />
        <Route path={"posts/:postId"} element={<Post />} />
        <Route path={"createarticle"} element={<CreateArticle />} />
        <Route path={"chat"} element={<Chat />} />
        <Route path={"grid"} element={<GridLayout />} />
        <Route path={"grid2"} element={<GridLayout2 />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
