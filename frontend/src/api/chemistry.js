import { axiosTest } from "./axiosClient";

export const get = (page, limit, search) =>
  axiosTest.get("root/chemistry", { params: { page, limit, search } });

export const create = (data) => axiosTest.post("root/chemistry", data);

export const update = (data) => {
  axiosTest.put(`root/chemistry`, data);
};

export const remove = (data) => {
  axiosTest.delete(`root/chemistry/?id=${data._id}`);
};

export const clone = (data) => {
  axiosTest.post("root/chemistry/clone", data);
};

export const getSelectors = () => axiosTest.get("root/chemistry");
