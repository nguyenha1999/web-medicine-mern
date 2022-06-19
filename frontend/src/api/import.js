import { axiosTest } from "./axiosClient";

export const get = (page, limit, search, isDescending) =>
  axiosTest.get("root/import", {
    // params: { page, limit, search, isDescending },
  });

export const create = (data) => axiosTest.post("root/import", data);

export const update = (data) => axiosTest.put(`root/import/${data._id}`, data);

export const remove = (id) => axiosTest.delete(`root/import/${id}`);
