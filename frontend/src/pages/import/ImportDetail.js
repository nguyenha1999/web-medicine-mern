import { Col, DatePicker, Form, Input, message, Modal, Row } from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { getSelectors } from "../../api/chemistry";
import { UserInfoAtom } from "../../recoils/Atoms";
import ChemistrySelector from "./ChemistrySelector";
import TypeSelector from "./TypeSelector";

const DATE_FORMAT = "DD/MM/YYYY";

const ImportDetail = ({ item, onOk, onCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const userInfo = useRecoilValue(UserInfoAtom);
  const { username, code } = userInfo;

  const [chemistryOptions, setChemistryOptions] = useState([]);
  const getChemistrySelector = useCallback(async () => {
    try {
      const res = await getSelectors();

      setChemistryOptions(res.data);
    } catch (err) {
      message.error(err.message);
    }
  }, []);

  useEffect(() => {
    getChemistrySelector();
  }, [getChemistrySelector]);

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
    // if (Array.isArray(data) && data?.products.length > 0) {
    const currentIds = data.products.map((product) => product._id);
    const newIds = values.filter((id) => !currentIds.includes(id));

    const newProducts = chemistryOptions
      .filter((product) => newIds.includes(product._id))
      .map((product) => ({
        _id: product._id,
        name: product.name,
        count: 1,
        code: product.code,
        price: product.price,
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
        staff: { username: username, code: code },
        products: data?.products?.map((product) => {
          return {
            _id: product._id,
            count: product.count,
            code: product.code,
            name: product.name,
            price: product.price,
          };
        }),
      };

      await onOk(result);
    } catch (err) {
      message.error(err.message);
    }
    setConfirmLoading(false);
  }, [code, data, onOk, username]);

  const isEdit = !!item?._id;
  const title = isEdit ? "S???a Ho?? ????n" : "Th??m Ho?? ????n";

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
        style={{ height: "300px", overflow: "auto", width: "500" }}
      >
        {!data._id && (
          <Form.Item>
            <h5>Lo???i :</h5>
            <TypeSelector
              value={data.isExport ? "????n Xu???t" : "????n Nh???p"}
              onChange={onChangeType}
            />
          </Form.Item>
        )}
        {data.staff && <h5>Nh??n vi??n: {data?.staff?.name || "Unknow"}</h5>}
        <Form.Item>
          <h5>{data.isExport ? "Th???i gian xu???t" : "Th???i gian nh???p"}</h5>
          <DatePicker
            format={DATE_FORMAT}
            value={moment(new Date(data.createdAt), DATE_FORMAT)}
            onChange={onChangeDate}
          />
        </Form.Item>
        <Form.Item>
          <h5>L???a ch???n Ho?? Ch???t</h5>
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
        {Array.isArray(data?.products) &&
          data?.products?.length > 0 &&
          data.products.map((product) => (
            <Form.Item key={product._id}>
              <Row gutter={8} style={{ width: "420px" }}>
                <Col span={12}>
                  <span>{product.name}</span>
                </Col>
                <Col span={12}>
                  <Input
                    type="number"
                    placeholder="S???  l?????ng"
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

export default ImportDetail;
