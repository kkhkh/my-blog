import React from "react";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material//Typography";
import Button from "@mui/material//Button";
import IconButton from "@mui/material//IconButton";
import MenuIcon from "@mui/icons-material//Menu";

const SampleDialogTitle = styled(DialogTitle)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
}));

const SampleDialogContent = styled(DialogContent)(({ theme }) => ({
  color: theme.palette.grey[700],
}));

const Header = (props: any) => {
  const { handleClose, open, title, content } = props;
  return (
    <Dialog onClose={handleClose} open={open}>
      <SampleDialogTitle>{title}</SampleDialogTitle>
      <SampleDialogContent>{content}</SampleDialogContent>
    </Dialog>
  );
};

export default Header;
