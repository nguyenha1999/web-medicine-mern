import { axiosClient } from "./axiosClient";

export const get = (page, role, search) =>
  axiosClient.get("root/user", {
    params: { page, role, search },
  });

export const create = (data) => axiosClient.post("/root/user", data);

export const update = (data) => axiosClient.put(`root/user`, data);

export const remove = (id, role) =>
  axiosClient.delete(`root/user/?id=${id}&role=${role}`);

export const login = (data) => {
  return axiosClient.post("/login", data);
};

export const updateProfile = (data) => {
  return axiosClient.put(`root/user/profile`, data);
};
