import { Form, Input, message, Modal } from "antd";
import { useCallback, useEffect, useState } from "react";
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
      message.error(err.message);
    }
  }, []);

  const [data, setData] = useState();

  const reset = () =>
    setData({
      nameCompany: "",
      adress: "",
      hotline: "",
      products: [],
    });

  useEffect(() => {
    if (!item) return;

    const itemData = {
      nameCompany: item.nameCompany,
      adress: item.address,
      hotline: item.hotline,
      products: item.products,
    };

    if (item._id) {
      itemData._id = item._id;
    }

    form.setFieldsValue({
      nameCompany: item.nameCompany,
      address: item.address,
      hotline: item.hotline,
      product: item.products,
    });

    setData(itemData);
  }, [form, item]);

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
  }, [getChemistrySelector]);

  const onFinish = useCallback(async () => {
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
      // reset();
    } catch (err) {
      message.error(err.message);
    }
    setConfirmLoading(false);
  }, [onOk, data]);

  const isEdit = !!item?._id;
  const title = isEdit ? "S???a Th??ng tin ?????i t??c" : "Th??m ?????i t??c";

  return (
    <Modal
      title={title}
      visible={!!item}
      onOk={() => form.submit()}
      onCancel={() => {
        reset();
        onCancel();
      }}
      confirmLoading={confirmLoading}
    >
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 22,
        }}
      >
        <Form.Item
          name="nameCompany"
          label="T??n ?????i T??c"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p t??n c??ng ty",
            },
          ]}
        >
          <Input
            value={data?.nameCompany}
            name="nameCompany"
            onChange={handlerInputChange}
          />
        </Form.Item>
        <Form.Item
          name="address"
          label="?????a Ch???"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p ?????a ch???!",
            },
          ]}
        >
          <Input name="address" onChange={handlerInputChange} />
        </Form.Item>
        <Form.Item
          name="hotline"
          label="Hotline"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p Hotline!",
            },
          ]}
        >
          <Input
            placeholder="S??? l?????ng"
            name="hotline"
            onChange={handlerInputChange}
            maxLength={10}
          />
        </Form.Item>
        <Form.Item label="Hotline">
          <ChemistrySelector
            options={chemistryOptions}
            value={
              Array.isArray(data?.products) &&
              data?.products?.length > 0 &&
              data?.products?.map((product) => product._id)
            }
            onChange={onChangeSelector}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ExportDetail;
