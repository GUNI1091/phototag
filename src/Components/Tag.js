import { Button, Typography, Stack } from "@mui/material";

const Tag = ({ content, index, tags, setTags }) => {
  const handleTagDelete = () => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };
  return (
    <div>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Typography variant="h6">{content}</Typography>
        <Button onClick={handleTagDelete} variant="outlined">
          ✕
        </Button>
      </Stack>
    </div>
  );
};

export default Tag;
