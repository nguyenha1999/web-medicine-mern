import { axiosClient, axiosTest } from "./axiosClient";

export const get = (page, limit, search) =>
  axiosClient.get("/chemistries", { params: { page, limit, search } });

export const create = (data) => axiosTest.post("root/chemistry", data);

export const update = (data) =>
  axiosClient.put(`/chemistries/${data._id}`, data);

export const remove = (id) => axiosClient.delete(`/chemistries/${id}`);

export const getSelectors = () => axiosClient.get("/chemistries-dropdown");
