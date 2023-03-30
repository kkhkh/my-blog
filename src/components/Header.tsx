import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import useQueryFirebaseUser from "../hooks/useQueryFirebaseUser";
import my_blog_cat_buti from "../assets/my_blog_cat_buti.png";
import { NavLink } from "react-router-dom";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #1976d2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const StyledImg = styled.img`
  width: 200px;
`;

const StyledNavigationMenu = styled.div`
  margin-left: 100px;
`;

const StyledNavigation = styled.div`
  display: flex;

  gap: 1rem;
  a {
    color: #fff;
    text-decoration: none;
    font-size: 1.2rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledSerchBox = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 1100px;
  div {
    display: flex;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 999px;
    background-color: #f0f2f5;
  }
`;

const StyledInput = styled.input`
  border: none !important;
  background-color: #f0f2f5;

  &:focus {
    outline: 0;
  }
`;

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.charAt(0)}`,
  };
}

const Header = () => {
  const { fireBaseUser } = useQueryFirebaseUser();

  return (
    <div>
      <StyledHeader>
        <StyledImg src={my_blog_cat_buti} />
        <StyledNavigationMenu>
          <StyledNavigation>
            <NavLink to="/">ホーム</NavLink>
            <NavLink to="/users">ユーザー一覧</NavLink>
            <NavLink to="/posts">投稿一覧</NavLink>
            <NavLink to="createarticle">投稿</NavLink>
          </StyledNavigation>
        </StyledNavigationMenu>
        <StyledSerchBox>
          <div>
            <SearchIcon />
            <StyledInput type="text" placeholder="serch" />
          </div>
        </StyledSerchBox>

        {!fireBaseUser || !fireBaseUser.displayName ? (
          <AccountCircleIcon />
        ) : (
          <Avatar {...stringAvatar(fireBaseUser.displayName || "")} />
        )}
      </StyledHeader>
    </div>
  );
};

export default Header;
