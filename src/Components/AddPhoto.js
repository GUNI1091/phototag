import { Button } from "@mui/material";
import React, { useState } from "react";
import "./Add.css";
import storage from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const ImageUploader = () => {
  const [uploadImageUrl, setUploadImageUrl] = useState("");

  const OnFileUpload = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    const storageRef = ref(storage, "image" + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Upload a file");
      console.log(snapshot);
      getDownloadURL(storageRef).then((url) => {
        console.log(url);
        setUploadImageUrl(url);
      });
    });
  };
  return (
    <div className="outerBox">
      <div className="title">
        <h2>画像アップロード</h2>
        <p>JpegかPngの画像ファイル</p>
      </div>
      <div className="imageUplodeBox">
        <div className="imageLogoAndText">
          <p>ここにドラッグ＆ドロップ</p>
        </div>
        <input
          className="imageUploadInput"
          multiple
          name="imageURL"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={OnFileUpload}
        />
      </div>
      <p>または</p>
      <Button variant="contained">
        ファイルを選択
        <input
          className="imageUploadInput"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={OnFileUpload}
        />
      </Button>
      <div>
        <img src={uploadImageUrl} alt=""></img>
      </div>
    </div>
  );
};

export default ImageUploader;
