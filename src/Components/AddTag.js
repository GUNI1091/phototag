import { useEffect, useState } from "react";
import Tag from "./Tag";
import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "../axios";

const AddTag = () => {
  const [inputText, setInputText] = useState("");
  const [tags, setTags] = useState([]);

  const getTags = () => {
    axios.get("/tags?user_id=12345").then((response) => {
      console.log(response.data);
      setTags(response.data.tags);
    });
  };

  useEffect(() => {
    getTags();
  }, []);

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
      <ul style={{ listStyle: "none" }}>
        {tags.map((item, index) => {
          return (
            <li key={index}>
              <Tag
                content={item.name}
                index={index}
                tags={tags}
                setTags={setTags}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AddTag;
