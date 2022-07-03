import { axiosTest } from "./axiosClient";

export const get = (page, limit, search, isDescending) =>
  axiosTest.get("root/export", {
    params: { page, limit, search, isDescending },
  });

export const create = (data) => axiosTest.post("root/export", data);

export const update = (data) => axiosTest.put("root/export", data);

export const remove = (id) => axiosTest.delete(`root/export/?id=${id}`);
