import { Form, Input, Modal, notification } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { getSelectors } from "../../api/chemistry";
import ChemistrySelector from "./ChemistrySelector";

const ExportDetail = ({ item, onOk, onCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const [chemistryOptions, setChemistryOptions] = useState([]);
  const getChemistrySelector = useCallback(async () => {
    try {
      const res = await getSelectors();
      setChemistryOptions(res.data);
    } catch (err) {
      notification.error({
        message: err.message,
      });
    }
  }, []);

  const [data, setData] = useState({
    nameCompany: "",
    adress: "",
    hotline: "",
    products: [],
    isExport: false,
  });

  const reset = () =>
    setData({
      nameCompany: "",
      adress: "",
      hotline: "",
      products: [],
      isExport: false,
    });

  useEffect(() => {
    if (!item) return;

    const itemData = {
      nameCompany: item.nameCompany,
      adress: item.adress,
      hotline: item.hotline,
      products: item.products,
      isExport: item.isExport,
    };

    if (item._id) {
      itemData._id = item._id;
    }

    setData(itemData);
  }, [item]);

  console.log(item);

  const onChangeSelector = (values) => {
    const currentIds = data.products.map((product) => product._id);
    const newIds = values.filter((id) => !currentIds.includes(id));

    const newProducts = chemistryOptions
      .filter((product) => newIds.includes(product._id))
      .map((product) => ({
        _id: product._id,
        name: product.name,
        count: 1,
      }));

    setData({
      ...data,
      products: [
        ...data.products.filter((product) => values.includes(product._id)),
        ...newProducts,
      ],
    });
  };

  const handlerInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    getChemistrySelector();
  }, []);

  console.log(data);

  const onFinish = useCallback(
    async (vlue) => {
      setConfirmLoading(true);
      try {
        if (!data || !data.products) {
          throw new Error("Invalid information");
        }

        if (!data.products.length) {
          throw new Error("Product list is empty");
        }

        const result = {
          ...data,
          products: data.products.map((product) => ({
            _id: product._id,
            count: product.count,
            name: product.name,
          })),
        };

        await onOk(result);
      } catch (err) {
        notification.error({ message: err.message });
      }
      setConfirmLoading(false);
    },
    [item, onOk, data]
  );

  const isEdit = !!item?._id;
  const title = isEdit ? "Sửa Hoá Đơn" : "Thêm Hoá Đơn";

  console.log(data);
  console.log(data.products);

  return (
    <Modal
      title={title}
      visible={!!item}
      onOk={() => {
        {
          form.submit();
        }
      }}
      onCancel={() => {
        reset();
        onCancel();
      }}
      confirmLoading={confirmLoading}
    >
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="nameCompany"
          label="Tên Đối Tác"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên công ty",
            },
          ]}
        >
          <Input value="1" name="nameCompany" onChange={handlerInputChange} />
        </Form.Item>
        <Form.Item
          name="adress"
          label="Địa Chỉ"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ!",
            },
          ]}
        >
          <Input
            style={{ marginLeft: "26px", width: "377px" }}
            name="adress"
            onChange={handlerInputChange}
          />
        </Form.Item>
        <Form.Item
          name="hotline"
          label="Hotline"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Hotline!",
            },
            {
              min: 10,
              message: "Số điện thoại phải dài ít nhất 10 chữ số!!",
            },
          ]}
        >
          <Input
            placeholder="Số lượng"
            style={{ marginLeft: "26px", width: "377px" }}
            name="hotline"
            onChange={handlerInputChange}
          />
        </Form.Item>
        <Form.Item
          name="products"
          label="Sản Phẩm"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên Sản Phẩm",
            },
          ]}
        >
          <ChemistrySelector
            options={chemistryOptions}
            value={data?.products?.map((product) => product._id)}
            onChange={onChangeSelector}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ExportDetail;
