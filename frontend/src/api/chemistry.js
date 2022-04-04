import { axiosClient } from "./axiosClient";

export const get = (page, limit, search) =>
  axiosClient.get("/chemistries", { params: { page, limit, search } });

export const create = (data) => axiosClient.post("/chemistries", data);

export const update = (data) =>
  axiosClient.put(`/chemistries/${data._id}`, data);

export const remove = (id) => axiosClient.delete(`/chemistries/${id}`);

export const getSelectors = () => axiosClient.get("/chemistries-dropdown");
