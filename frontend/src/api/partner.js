import { axiosTest } from "./axiosClient";

export const get = (page, limit, search, isDescending) =>
  axiosTest.get("root/partner", {
    params: { page, limit, search, isDescending },
  });

export const create = (data) => axiosTest.post("root/partner", data);

export const update = (data) => axiosTest.put(`root/partner`, data);

export const remove = (id) => axiosTest.delete(`root/partner/?id=${id}`);
