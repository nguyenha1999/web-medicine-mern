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
export const imports = atom({
  key: key.IMPORT,
  default: [],
});

export const exports = atom({
  key: key.EXPORT,
  default: [],
});

export const user = atom({
  key: key.USER,
  default: [],
});
