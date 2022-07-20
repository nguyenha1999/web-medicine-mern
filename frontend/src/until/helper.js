export const enCodeBase64 = (str) =>
  window.btoa(unescape(encodeURIComponent(str)));
export const deCodeBase64 = (str) =>
  decodeURIComponent(escape(window.atob(str)));
