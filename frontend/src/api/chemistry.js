import { axiosClient, axiosTest } from "./axiosClient";

export const get = (page, limit, search) =>
  axiosTest.get("root/chemistry", { params: { page, limit, search } });

export const create = (data) => axiosTest.post("root/chemistry", data);

export const update = (data) => {
  axiosTest.put(`root/chemistry`, data);
};

export const remove = (data) => {
  axiosTest.put(`root/chemistry/location`, data);
};

export const getSelectors = () => axiosClient.get("/chemistries-dropdown");
