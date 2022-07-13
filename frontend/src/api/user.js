import { axiosClient } from "./axiosClient";

export const get = (page, role, limit, search, isDescending) =>
  axiosClient.get("root/user", {
    params: { page, role, limit, search, isDescending },
  });

export const create = (data) => axiosClient.post("/root/user", data);

export const update = (data) => axiosClient.put(`/users/${data._id}`, data);

export const remove = (id, role) =>
  axiosClient.delete(`root/user/?id=${id}&role=${role}`);

export const login = (data) => {
  return axiosClient.post("/login", data);
};

export const updateProfile = (data) => {
  return axiosClient.put(`root/user/profile`, data);
};
