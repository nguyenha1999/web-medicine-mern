import { axiosClient } from "./axiosClient";

export const getById = (code) =>
  axiosClient.get(`root/recipe`, { params: { code } });

export const create = (data) => {
  axiosClient.post("root/recipe", data);
};

export const update = (data) => axiosClient.put(`root/recipe`, data);

export const remove = (data) =>
  axiosClient.delete(
    `root/recipe/?childId=${data.childId}&parentId=${data.parentId}`
  );
