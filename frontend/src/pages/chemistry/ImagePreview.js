import { notification } from "antd";
import React from "react";
import style from "./style";

const maxFileSize = 40097152;

const ImagePreview = (props) => {
  const {
    imageId,
    imageUrl,
    setFile,
    imagePreviewUrl,
    setImagePreviewUrl,
    maxWidth,
    maxHeight,
  } = props;

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let newFile = e.target.files[0];

    if (newFile?.size > maxFileSize) {
      notification.error({
        message: "File phải nhỏ hơn 4MB",
      });
      return;
    }

    reader.onloadend = () => {
      setFile(newFile);
      setImagePreviewUrl(reader.result);
    };

    if (newFile) {
      reader.readAsDataURL(newFile);
    }
  };

  const imagePreviewContainer =
    imagePreviewUrl || imageUrl ? (
      <img
        style={{ maxWidth: maxWidth || "100%", maxHeight: maxHeight || "100%" }}
        src={imagePreviewUrl || imageUrl}
        alt=""
      />
    ) : null;

  return (
    <div style={style.mb2}>
      <div style={style.mb2}>
        <input
          style={style.hiddenInput}
          type="file"
          id={imageId}
          onChange={handleImageChange}
          accept="image/x-png,image/jpeg"
        />
        <label
          htmlFor={imageId}
          role="button"
          tabIndex={0}
          style={style.labelInput}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#1b8eb7";
            e.target.style.border = "1px solid #1985ac";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#20a8d8";
            e.target.style.border = "1px solid #20a8d8";
          }}
        >
          {imagePreviewUrl || imageUrl ? "Thay đổi" : "Chọn file"}
        </label>
      </div>
      {imagePreviewContainer}
    </div>
  );
};

export default ImagePreview;
