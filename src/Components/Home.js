import "./ImageGarally.css";
import "./Modal.css";
import { useState } from "react";
import storage from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import * as React from "react";
import { IconButton, Modal, makeStyles, Box } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import styled from "@emotion/styled";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import axios from "../axios";
import { borderRadius } from "@mui/system";
import AddTag from "./AddTag";

const Home = () => {
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [open, setOpen] = React.useState(false);
  const [opentag, setOpenTag] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenTag = () => setOpenTag(true);
  const handleCloseTag = () => setOpenTag(false);

  const [photos, setPhotos] = useState([]);
  const [fileName, setSileName] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const modal_style = {
    display: "flex",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
  };

  const Input = styled("input")({
    display: "none",
  });

  const getTags = () => {
    axios.get("/tags?user_id=12345").then((response) => {
      console.log(response.data);
      setTags(response.data.tags);
    });
  };

  const getPhoto = () => {
    axios.get("/photos?user_id=12345").then((response) => {
      console.log(response.data);
      setPhotos(response.data.photos);
    });
  };

  React.useEffect(() => {
    getPhoto();
  }, []);

  const OnFileUpload = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    const storageRef = ref(storage, uuidv4() + "-" + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Upload a file");
      console.log(snapshot);
      setSileName(snapshot.metadata.name);
      getDownloadURL(storageRef).then((url) => {
        console.log(url);
        setUploadImageUrl(url);
        getTags();
        handleOpen();
      });
    });
  };

  return (
    <div>
      <div className="image-wrapper">
        {photos.map(({ photo_url, photo_id, tags }, index) => {
          return (
            <div key={index} className="image">
              <img src={photo_url} alt={photo_id} />
              <div className="tag-list">
                {tags.map(({ name }, tag_index) => {
                  return (
                    <span className="tag" key={tag_index}>
                      {name}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={OnFileUpload}
        />
        <IconButton
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          size="large"
          aria-label="upload picture"
          component="span"
        >
          <AddPhotoAlternateIcon fontSize="large" color="error" />
        </IconButton>
      </label>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={modal_style}>
          <img src={uploadImageUrl} width="200px" className="modal_image" />
          <Box className="modal_taglist_style">
            <button
              className="tag_add_button"
              onClick={() => {
                handleOpenTag();
              }}
            >
              +
            </button>
            {tags.map((item, index) => {
              return (
                <Box
                  className={[
                    selectedTags.includes(item.id) == true
                      ? "selectedStyle"
                      : "defaultStyle",
                    "modal_tag",
                  ]}
                  key={index}
                  onClick={() => {
                    if (selectedTags.includes(item.id)) {
                      var index = selectedTags.indexOf(item.id);
                      selectedTags.splice(index, 1);
                      setSelectedTags([...selectedTags]);
                    } else {
                      setSelectedTags([...selectedTags, item.id]);
                      console.log(selectedTags);
                    }
                  }}
                >
                  {item.name}
                </Box>
              );
            })}
          </Box>
          <button
            className="image_upload_button"
            onClick={() => {
              axios
                .post("/photos?user_id=12345", {
                  photo_id: fileName,
                  photo_url: uploadImageUrl,
                  tag_ids: selectedTags,
                })
                .then(function (response) {
                  console.log(response.data);
                  setSelectedTags([]);
                  handleClose();
                  getPhoto();
                });
            }}
          >
            UpLoad
          </button>
        </Box>
      </Modal>
      <Modal open={opentag} onClose={handleCloseTag}>
        <Box sx={modal_style}>
          <AddTag
            getTags={() => {
              getTags();
              handleCloseTag();
            }}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
