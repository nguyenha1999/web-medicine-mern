import React, { useState } from "react"
import { Modal } from "antd"

const ConfirmModal = ({ visible, title, message, onOk, onCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)

  const onConfirm = async () => {
    setConfirmLoading(true)

    await onOk()

    setConfirmLoading(false)
  }

  return <Modal 
    visible={visible} 
    title={title} 
    onOk={onConfirm} 
    onCancel={onCancel}
    confirmLoading={confirmLoading}
  >
    <p>{message}</p>
  </Modal>
}

export default ConfirmModal