import { useEffect, useState } from "react";
import Tag from "./Tag";
import AddTag from "./AddTag";
import axios from "../axios";

const TagList = () => {
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

  return (
    <div>
      <h1>TAG LIST</h1>
      <AddTag
        getTags={() => {
          getTags();
        }}
      />
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

export default TagList;
