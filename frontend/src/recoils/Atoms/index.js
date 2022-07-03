import { atom } from "recoil";
import * as key from "./atom";

export const chemistry = atom({
  key: key.CHEMISTRY,
  default: [],
});

export const bill = atom({
  key: key.BILL,
  default: [],
});
export const ImportAtom = atom({
  key: "ImportAtom",
  default: [],
});

export const exports = atom({
  key: key.EXPORT,
  default: [],
});

export const partner = atom({
  key: "parners",
  default: undefined,
});

export const UserInfoAtom = atom({
  key: "UserInfoAtom",
  default: [],
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((data) => {
        localStorage.setItem("medicine-user-info", JSON.stringify(data));
      });
    },
  ],
});
