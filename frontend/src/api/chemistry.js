import { apiUpload, axiosClient } from "./axiosClient";

export const get = (page, role, search) =>
  axiosClient.get("root/chemistry", { params: { page, role, search } });

export const create = (data) => axiosClient.post("root/chemistry", data);

export const update = (data) => {
  axiosClient.put(`root/chemistry`, data);
};

export const remove = (data) => {
  axiosClient.delete(`root/chemistry/?id=${data._id}&role=${data.role}`);
};

export const clone = (data) => {
  axiosClient.post("root/chemistry/clone", data);
};

export const uploadFile = (formData) => {
  apiUpload.post("post_upload", formData);
};

export const getSelectors = () => axiosClient.get("root/chemistry");
