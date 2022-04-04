import { axiosClient } from "./axiosClient";

export const get = (page, limit, search, isDescending) =>
  axiosClient.get("/imports", {
    params: { page, limit, search, isDescending },
  });

export const create = (data) => axiosClient.post("/imports", data);

export const update = (data) => axiosClient.put(`/imports/${data._id}`, data);

export const remove = (id) => axiosClient.delete(`/imports/${id}`);
