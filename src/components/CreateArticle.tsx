import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CreateArticle = () => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="title"
          multiline
          maxRows={4}
        />

        <TextField
          id="outlined-multiline-static"
          label="content"
          multiline
          rows={4}
        />
      </div>
      <Button>本文生成</Button>
      <Button>投稿</Button>
    </Box>
  );
};

export default CreateArticle;
