import { axiosClient } from "./axiosClient";

export const get = (page, limit, search, isDescending) =>
  axiosClient.get("/bills", { params: { page, limit, search, isDescending } });

export const create = (data) => axiosClient.post("/bills", data);

export const update = (data) => axiosClient.put(`/bills/${data._id}`, data);

export const remove = (id) => axiosClient.delete(`/bills/${id}`);
