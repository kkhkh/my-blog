import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Chat from "./components/Chat";
import CreateArticle from "./components/CreateArticle";
import { CookiesProvider } from "react-cookie";
import { useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };

  return (
    <div className="container">
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path={"/register/"} element={<Register />} />
            <Route path={"/login/"} element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path={"/posts"} element={<Posts />} />
              <Route path={"posts/:postId"} element={<Post />} />
              <Route path={"createarticle"} element={<CreateArticle />} />
              <Route path={"chat"} element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
};

export default App;
