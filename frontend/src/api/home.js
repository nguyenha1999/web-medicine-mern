import { axiosTest } from "./axiosClient";

export const get = () => axiosTest.get("/root/home");

// export const create = (data) => axiosTest.post("/bills", data);

// export const update = (data) => axiosTest.put(`/bills/${data._id}`, data);

// export const remove = (id) => axiosTest.delete(`/bills/${id}`);
