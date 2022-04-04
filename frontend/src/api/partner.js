import { axiosClient } from "./axiosClient";

export const get = (page, limit, search, isDescending) =>
  axiosClient.get("/partners", {
    params: { page, limit, search, isDescending },
  });

export const create = (data) => axiosClient.post("/partners", data);

export const update = (data) => axiosClient.put(`/partners/${data._id}`, data);

export const remove = (id) => axiosClient.delete(`/partners/${id}`);
