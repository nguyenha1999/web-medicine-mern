import { Modal } from "antd";
import React from "react";
import style from "./style";

const ImageModal = ({ imageUrl, setImageUrl }) => {
  return (
    <Modal
      title="Ảnh hoá chất"
      visible={!!imageUrl}
      onCancel={() => setImageUrl(null)}
      footer={null}
    >
      <div style={style.modalContainer}>
        {imageUrl && (
          <img src={imageUrl} style={style.image} alt="chemistry-image" />
        )}
      </div>
    </Modal>
  );
};

export default ImageModal;
