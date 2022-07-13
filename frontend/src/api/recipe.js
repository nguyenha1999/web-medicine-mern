import { axiosClient } from "./axiosClient";

export const getById = (code) =>
  axiosClient.get(`root/recipe`, { params: { code } });

export const create = (data) => axiosClient.post("root/recipe", data);

export const update = (data) => axiosClient.put(`/recipes/${data._id}`, data);

export const remove = (id) => axiosClient.delete(`/recipes/${id}`);
