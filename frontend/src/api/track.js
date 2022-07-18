import { axiosClient } from "./axiosClient";

export const get = () => {
  axiosClient.get("root/tracker");
};
