import React from "react";
import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ButtonGroup from "@mui/material/ButtonGroup";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import useQueryFirebaseUser from "../hooks/useQueryFirebaseUser";
import axios from "axios";

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

type user = {
  createdAt: string;
  role: boolean;
  name: string;
  id: number;
  email: string;
  updatedAt: string;
};

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

const Users = () => {
  const [users, setUsers] = useState<user[]>([]);
  const { fireBaseUser } = useQueryFirebaseUser();

  useEffect(() => {
    (async () => {
      console.log(await fireBaseUser?.getIdToken());
      axios
        .get<user[]>("https://api-blog-dev.lightsail.ijcloud.jp/admin/users", {
          headers: {
            Authorization: "Bearer " + (await fireBaseUser?.getIdToken()),
            accept: "application/json",
          },
        })
        .then((response: any) => {
          const usersList = response.data.users.map((item: any) => ({
            createdAt: item.createdAt,
            role: item.role,
            name: item.name,
            id: item.id,
            email: item.email,
            updatedAt: item.updatedAt,
          }));
          console.log("response:");
          console.log(response);
          console.log(usersList);
          setUsers(usersList);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  const theme = createTheme();
  return (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            ユーザー一覧
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained">Main call to action</Button>
            <Button variant="outlined">Secondary action</Button>
          </Stack>
        </Container>
      </Box>
      {/* <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}> */}
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {users.map((user) => {
          return (
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar {...stringAvatar(user.name || "")} />
                  <ListItemText
                    primary={user.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {user.email}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItemAvatar>
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          );
        })}
      </List>
      {/* </Grid>
        </Container> */}
    </main>
  );
};

export default Users;
