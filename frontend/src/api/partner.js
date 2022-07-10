import { axiosClient } from "./axiosClient";

export const get = (page, role, limit, search, isDescending) =>
  axiosClient.get("root/partner", {
    params: { page, role, limit, search, isDescending },
  });

export const create = (data) => axiosClient.post("root/partner", data);

export const update = (data) => axiosClient.put(`root/partner`, data);

export const remove = (id, role) =>
  axiosClient.delete(`root/partner/?id=${id}&role=${role}`);
