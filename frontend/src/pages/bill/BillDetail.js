import { Col, DatePicker, Form, Input, Modal, notification, Row } from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { getSelectors } from "../../api/chemistry";
import ChemistrySelector from "./ChemistrySelector";
import TypeSelector from "./TypeSelector";

const DATE_FORMAT = "DD/MM/YYYY";

const BillDetail = ({ item, onOk, onCancel }) => {
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
    createdAt: new Date().getTime(),
    products: [],
    isExport: false,
  });

  const reset = () =>
    setData({
      createdAt: new Date().getTime(),
      products: [],
      isExport: false,
    });

  useEffect(() => {
    if (!item) return;

    const itemData = {
      createdAt: item.createdAt,
      products: item.products,
      isExport: item.isExport,
      staff: item.staff,
    };

    if (item._id) {
      itemData._id = item._id;
    }

    setData(itemData);
  }, [item]);

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

  const onChangeType = (value) => {
    setData({
      ...data,
      isExport: value === "Export",
    });
  };

  const onChangeDate = (value) => {
    setData({
      ...data,
      createdAt: moment(value).toDate().getTime(),
    });
  };

  const onUpdateCountProduct = (productId, count) => {
    setData({
      ...data,
      products: data.products.map((product) => {
        if (product._id !== productId) return product;
        return {
          ...product,
          count,
        };
      }),
    });
  };

  useEffect(() => {
    getChemistrySelector();
  }, []);

  const onFinish = useCallback(async () => {
    setConfirmLoading(true);
    try {
      if (!data || !data.products || !data.createdAt) {
        throw new Error("Invalid information");
      }

      if (!data.products.length) {
        throw new Error("Product list is empty");
      }

      if (!!data.products.find((product) => !product.count)) {
        throw new Error("Product count have to be greater than 0");
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
  }, [item, onOk, data]);

  const isEdit = !!item?._id;
  const title = isEdit ? "Edit bill" : "Create bill";

  console.log(data.staff);

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
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        {!data._id && (
          <Form.Item>
            <h5>Type</h5>
            <TypeSelector
              value={data.isExport ? "Export" : "Import"}
              onChange={onChangeType}
            />
          </Form.Item>
        )}
        {data.staff && <h5>Staff: {data.staff.name || "Unknown"}</h5>}
        <Form.Item>
          <h5>{data.isExport ? "Export time" : "Import time"}</h5>
          <DatePicker
            format={DATE_FORMAT}
            value={moment(new Date(data.createdAt), DATE_FORMAT)}
            onChange={onChangeDate}
          />
        </Form.Item>
        <Form.Item>
          <h5>Select chemistries</h5>
          <ChemistrySelector
            options={chemistryOptions}
            value={data.products.map((product) => product._id)}
            onChange={onChangeSelector}
          />
        </Form.Item>
        {data.products.map((product) => (
          <Form.Item key={product._id}>
            <Row gutter={8}>
              <Col span={12}>
                <span>{product.name}</span>
              </Col>
              <Col span={12}>
                <Input
                  type="number"
                  placeholder="Count"
                  value={product.count}
                  onChange={(e) =>
                    onUpdateCountProduct(product._id, Number(e.target.value))
                  }
                />
              </Col>
            </Row>
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default BillDetail;
