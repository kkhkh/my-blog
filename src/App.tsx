import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import Users from "./components/Users";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Chat from "./components/Chat";
import Album from "./components/Album";
import Test from "./components/Test";

import CreateArticle from "./components/CreateArticle";
import { CookiesProvider } from "react-cookie";
import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };
  const queryClient = new QueryClient();

  return (
    // <div className="container">
    // <AuthProvider>
    // {/* <QueryClientProvider client={queryClient}> */}
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path={"test"} element={<Test />} />
          <Route path={"album"} element={<Album />} />
          <Route path={"/register/"} element={<Register />} />
          <Route path={"/login/"} element={<Login />} />
          {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<Home />} />
          <Route path={"/users/"} element={<Users />} />
          <Route path={"/posts"} element={<Posts />} />
          <Route path={"posts/:postId"} element={<Post />} />
          <Route path={"createarticle"} element={<CreateArticle />} />
          <Route path={"chat"} element={<Chat />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
    // {/* </QueryClientProvider> */}
    // </AuthProvider>
    // </div>
  );
};

export default App;
