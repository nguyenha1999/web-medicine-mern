import axios from "axios";

const token = sessionStorage.getItem("token");

export const axiosClient = axios.create({
  baseURL: "https://61d84141e6744d0017ba8a00.mockapi.io/api/v1/",
  // baseURL: "http://localhost:3001",
  headers: {
    Authorization: "Bearer ",
    "Content-Type": "application/json",
  },
});

export const axiosTest = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    Authorization: "Bearer" + token,
    "Content-Type": "application/json",
  },
});

export const apiUpload = axios.create({
  baseURL: "https://61d84141e6744d0017ba8a00.mockapi.io/api/v1/",
  timeout: 15000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const uploadFile = (formData) =>
  apiUpload.post("upload_file_endpoint", formData);
