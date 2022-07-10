import axios from "axios";

const token = sessionStorage.getItem("token");

export const axiosClient = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    Authorization: "Bearer" + token,
    "Content-Type": "application/json",
  },
});

export const apiUpload = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    Authorization: "Bearer" + token,
    "Content-Type": "multipart/form-data",
    Accept: "multipart/form-data",
  },
});
