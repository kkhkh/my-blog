import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ButtonGroup from "@mui/material/ButtonGroup";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import SearchIcon from "@mui/icons-material/Search";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

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

  const theme = createTheme();

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

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
              <ThemeProvider theme={theme}>
                <CssBaseline />
                {/* <AppBar position="relative"> */}
                <Box sx={{ flexGrow: 1 }}>
                  <AppBar position="static">
                    <Toolbar>
                      <SettingsAccessibilityIcon sx={{ mr: 2 }} />
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                      ></Typography>
                      <Search>
                        <SearchIconWrapper>
                          <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                          placeholder="Search…"
                          inputProps={{ "aria-label": "search" }}
                        />
                      </Search>
                    </Toolbar>
                  </AppBar>
                </Box>
                <ButtonGroup variant="text" aria-label="text button group">
                  <Button>
                    <NavLink to="/">ホーム</NavLink>
                  </Button>
                  <Button>
                    <NavLink to="/users">ユーザー一覧</NavLink>
                  </Button>
                  <Button>
                    <NavLink to="/posts">記事一覧</NavLink>
                  </Button>
                </ButtonGroup>
                <p>{user?.email}</p>
                <p>
                  <Link to={"/createarticle/"}>投稿</Link>
                </p>
                <button onClick={logout}>ログアウト</button>
              </ThemeProvider>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
