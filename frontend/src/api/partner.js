import { axiosClient } from "./axiosClient";

export const get = (page, role, search) =>
  axiosClient.get("root/partner", {
    params: { page, role, search },
  });

export const create = (data) => axiosClient.post("root/partner", data);

export const update = (data) => axiosClient.put(`root/partner`, data);

export const remove = (id, role) =>
  axiosClient.delete(`root/partner/?id=${id}&role=${role}`);
