import { axiosClient, axiosTest } from "./axiosClient";

export const get = (page, limit, search, isDescending) =>
  axiosTest.get("root/user", {
    params: { page, limit, search, isDescending },
  });

export const create = (data) => axiosTest.post("/root/user", data);

export const update = (data) => axiosClient.put(`/users/${data._id}`, data);

export const remove = (id) => axiosTest.delete(`root/user/?id=${id}`);

export const login = (data) => {
  return axiosTest.post("/login", data);
};

export const updateProfile = (data) => {
  return axiosTest.put(`root/user/profile`, data);
};
