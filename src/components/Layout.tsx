import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">ホーム</NavLink>
        </li>
        <li>
          <NavLink to="/posts">記事一覧</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Layout;
