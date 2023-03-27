import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Container from "@mui/material/Container";
import Item from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import CameraIcon from "@mui/icons-material/Camera";
import { Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import { styled, alpha } from "@mui/material/styles";
import Link from "@mui/material/Link";
import SearchIcon from "@mui/icons-material/Search";
import ButtonBase from "@mui/material/ButtonBase";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import useQueryFirebaseUser from "../hooks/useQueryFirebaseUser";

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

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

const Layout: React.FC = () => {
  const { fireBaseUser } = useQueryFirebaseUser();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AppBar position="relative"> */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container maxWidth="md">
            <Toolbar>
              <SettingsAccessibilityIcon sx={{ mr: 2 }} />
              My Blog
              <ButtonBase sx={{ ml: "auto" }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                {fireBaseUser && fireBaseUser.displayName ? (
                  <Avatar {...stringAvatar(fireBaseUser.displayName || "")} />
                ) : (
                  <AccountCircleIcon />
                )}
              </ButtonBase>
            </Toolbar>
          </Container>
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
        <Button>
          <NavLink to={"/createarticle/"}>投稿</NavLink>
        </Button>
      </ButtonGroup>
      <Outlet />
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
};

export default Layout;
