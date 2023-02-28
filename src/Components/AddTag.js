import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "../axios";

const AddTag = ({ getTags }) => {
  const [inputText, setInputText] = useState("");
  const handleAddTag = () => {
    axios
      .post("/tags?user_id=12345", {
        name: inputText,
      })
      .then((response) => {
        console.log(response.data);
        getTags();
      });
    setInputText("");
  };

  return (
    <div>
      <h1>TAG LIST</h1>
      <Stack direction="row" spacing={2} justifyContent="center">
        <TextField
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
        <Button onClick={handleAddTag} variant="contained">
          追加
        </Button>
      </Stack>
    </div>
  );
};

export default AddTag;
