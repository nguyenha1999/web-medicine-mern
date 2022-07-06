import { axiosClient, axiosTest } from "./axiosClient";

// export const get = (page, limit, search, isDescending) =>
//   axiosClient.get("/root/bill", {
//     params: { page, limit, search, isDescending },
//   });
export const get = () => axiosTest.get("/root/bill");

export const create = (data) => axiosTest.post("/root/bill", data);

export const update = (data) => axiosClient.put(`/bills/${data._id}`, data);

export const remove = (id) => axiosClient.delete(`/bills/${id}`);
