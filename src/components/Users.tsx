import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
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
import styled from "styled-components";

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

const StyledContainer = styled.div`
  width: 1000px;
  margin: auto;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  table-layout: auto;
  tr {
    border-bottom: solid 1px #eee;
    cursor: pointer;
    &:hover {
      background-color: #d4f0fd;
    }
  }
  th,
  td {
    text-align: center;
    padding: 15px 0;
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

const Users = () => {
  const [users, setUsers] = useState<user[]>([]);
  const { fireBaseUser } = useQueryFirebaseUser();

  useEffect(() => {
    (async () => {
      console.log("Users");
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledContainer>
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

        <StyledTable>
          <tr>
            <th></th>
            <th>ユーザー名</th>
            <th>メールアドレス</th>
            <th>権限</th>
            <th>登録日</th>
          </tr>

          {users.map((user) => {
            return (
              <tr>
                <td>
                  {" "}
                  <Avatar {...stringAvatar(user.name || "")} />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {new Date(user.createdAt).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
              </tr>
            );
          })}
        </StyledTable>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default Users;
