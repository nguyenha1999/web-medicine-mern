import { axiosClient } from "./axiosClient";

export const get = (page, role, limit, search, isDescending) =>
  axiosClient.get("root/export", {
    params: { page, role, limit, search, isDescending },
  });

export const create = (data) => axiosClient.post("root/export", data);

export const update = (data) => axiosClient.put("root/export", data);

export const remove = (id, role) =>
  axiosClient.delete(`root/export/?id=${id}&role=${role}`);
