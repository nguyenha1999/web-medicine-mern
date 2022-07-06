export const formConfig = {
  name: {
    label: "Tên hoá chất",
    rules: [
      {
        required: true,
        message: "Vui lòng nhập tên hoá chất!",
      },
    ],
    error: {
      validate: () => {
        return formConfig.notExist || "Hoá chất đã tồn tại";
      },
    },
    notExist: true,
  },
  code: {
    label: "Mã hoá chất",
    rules: [
      {
        required: true,
        message: "Vui lòng nhập mã hoá chất!",
      },
    ],
    error: {
      validate: () => {
        return formConfig.notExist || "Hoá chất đã tồn tại";
      },
    },
    notExist: true,
  },

  price: {
    label: "Gía hoá chất",
    rules: [
      {
        required: true,
        message: "Vui lòng nhập giá hoá chất!",
      },
    ],
  },
  use: {
    label: "Cách sử dụng",
    rules: [
      {
        required: true,
        message: "Vui lòng nhập cách sử dụng hoá chất!",
      },
    ],
    type: "textarea",
  },
};
