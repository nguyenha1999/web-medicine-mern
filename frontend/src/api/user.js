import { axiosClient } from "./axiosClient";

export const get = (page, limit, search, isDescending) =>
  axiosClient.get("/bills", { params: { page, limit, search, isDescending } });

export const create = (data) => axiosClient.post("/users", data);

export const update = (data) => axiosClient.put(`/users/${data._id}`, data);

export const remove = (id) => axiosClient.delete(`/users/${id}`);

export const login = (data) => {
  return axiosClient.post("/login", data);
};

export const updateProfile = (data) => {
  return axiosClient.post(`/users/${data._id}`, data);
};
