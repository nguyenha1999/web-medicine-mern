import { axiosClient } from "./axiosClient";

export const get = (page, role, limit, search, isDescending) =>
  axiosClient.get("root/import", {
    params: { page, role, limit, search, isDescending },
  });

export const create = (data) => axiosClient.post("root/import", data);

export const update = (data) =>
  axiosClient.put(`root/import/${data._id}`, data);

export const remove = (id, role) =>
  axiosClient.delete(`root/import/?id=${id}&role=${role}`);
