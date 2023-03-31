import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "boring-avatars";
import my_blog_cat_buti from "../assets/my_blog_cat_buti.png";
import { NavLink } from "react-router-dom";
import useQueryFirebaseUser from "../hooks/useQueryFirebaseUser";

const StyledHeader = styled.header`
  display: flex;
  margin-top: 0;
  position: sticky;
  background-color: #dbcfc0;
  width: 100vw;
  height: 80px;
  justify-content: space-around;
`;

// ヘッダー左側
const StyledHeaderLeft = styled.div`
  display: flex;
`;

const StyledHeaderLeftObject = styled.div`
  margin: 5px 10px 5px 3px;
  color: white;
  cursor: pointer;
`;

const StyledHeaderImg = styled.img`
  width: 200px;
`;

const StyledHeaderLeftNavigation = styled.div`
  display: flex;
  margin-left: 50px;
  align-items: center;
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

//検索フォーム
const StyledSerchForm = styled.div`
  display: flex;
  border: 1px solid #b7b7be;
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  .MuiSvgIcon-root {
    color: #baaeaa !important;
    font-size: 20px !important;
  }
  input {
    border: none;
    &:focus {
      outline: 0;
    }
    ::placeholder {
      color: #baaeaa;
      font-size: 12px;
    }
    &:hover {
      display: flex;
      background-color: white;
    }
  }
  @media screen and (max-width: 990px) {
    display: none;
  }
`;

const StyledSerchFormMedia = styled.div`
  @media screen and (max-width: 990px) {
    .MuiSvgIcon-root {
      color: white !important;
      font-size: 23px !important;
      margin-top: 5px;
    }
  }
  @media screen and (min-width: 991px) {
    .MuiSvgIcon-root {
      display: none;
    }
  }
`;

// ヘッダー右側
const StyledHeaderRight = styled.div`
  display: flex;
`;

const StyledHeaderRightObject = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  p {
    color: white;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .MuiSvgIcon-root {
    cursor: pointer;
    color: white;
    font-size: 15px;
    margin-right: 5px;
  }
  @media screen and (max-width: 757px) {
    display: none;
  }
`;

const StyledHeaderRightPublish = styled.div`
  display: flex;
  border: 1px solid #3e9200;
  background-color: #3e9200;
  padding: 5px;
  border-radius: 5px;
  align-items: center;
  p {
    color: white;
    font-size: 12px;
    cursor: pointer;
    margin-right: 3px;
    &:hover {
      background-color: #367e00;
    }
  }
  .MuiSvgIcon-root {
    color: white !important;
    font-size: 15px !important;
    margin-right: 5px;
  }
`;

const StyledHeaderRightNotification = styled.div`
  display: flex;
  border: 1px solid #edfce2;
  padding: 3px;
  background-color: #edfce2;
  border-radius: 5px;
  align-items: center;
  p {
    color: #55c500;
    font-size: 12px;
    cursor: pointer;
    margin-right: 3px;
  }
  .MuiSvgIcon-root {
    color: #55c500 !important;
    font-size: 20px !important;
    margin-right: 5px;
  }
`;

const StyledHeaderRightObjectMedia = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  @media screen and (max-width: 757px) {
    display: flex;
    align-items: center;
    margin-right: 20px;
    .MuiSvgIcon-root {
      cursor: pointer;
      color: white !important;
      font-size: 15px !important;
      margin-right: 5px;
    }
  }

  @media screen and (min-width: 758px) {
    display: none;
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
    <StyledHeader>
      <StyledHeaderLeft>
        <StyledHeaderLeftObject>
          <StyledHeaderImg src={my_blog_cat_buti} />
        </StyledHeaderLeftObject>
        <StyledHeaderLeftNavigation>
          <StyledNavigation>
            <NavLink to="/">ホーム</NavLink>
            <NavLink to="/users">ユーザー一覧</NavLink>
            <NavLink to="/posts">投稿一覧</NavLink>
            <NavLink to="createarticle">投稿</NavLink>
          </StyledNavigation>
        </StyledHeaderLeftNavigation>
      </StyledHeaderLeft>

      <StyledHeaderRight>
        <StyledHeaderRightObject>
          <StyledSerchForm>
            <SearchIcon />
            <input placeholder="キーワードを入力" />
          </StyledSerchForm>
          <StyledSerchFormMedia>
            <SearchIcon />
          </StyledSerchFormMedia>
        </StyledHeaderRightObject>
        <StyledHeaderRightObject>
          {!fireBaseUser || !fireBaseUser.displayName ? (
            <Avatar
              size={40}
              name="Mary Baker"
              variant="beam"
              colors={["#FDF1CC", "#C6D6B8", "#987F69", "#E3AD40", "#FCD036"]}
            />
          ) : (
            // <Avatar {...stringAvatar(fireBaseUser.displayName || "")} />
            <Avatar
              size={40}
              name="Willa Cather"
              variant="beam"
              colors={["#FDF1CC", "#C6D6B8", "#987F69", "#E3AD40", "#FCD036"]}
            />
          )}
        </StyledHeaderRightObject>
      </StyledHeaderRight>
    </StyledHeader>
  );
};

export default Header;
