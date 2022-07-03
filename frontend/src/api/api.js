import axios from "axios";

class API {
  /**
   * Set token for default API calls (to REACT_APP_STOCKBOOK_API).
   */
  setAccessToken(accessToken) {
    this.accessToken = accessToken;
    this.authHeaderValue = `Bearer ${this.accessToken}`;
  }

  clearAccessToken() {
    delete this.accessToken;
    delete this.authHeaderValue;
  }

  request = (config) => {
    const { method = "GET", url, params, headers } = config;
    const { baseURL = "http://localhost:3001/api" } = config;

    // console.log('API.token:', this.accessToken);
    // console.log('API.Request:', `${baseURL}${url}`, params, method);

    let newHeaders = { "Content-Type": "application/json" };
    if (this.accessToken) {
      newHeaders.Authorization = this.authHeaderValue;
    }
    if (headers) {
      newHeaders = { ...newHeaders, ...headers };
    }

    const requestConfig = {
      method,
      url,
      baseURL,
      headers: newHeaders,
      timeout: 20000,
      timeoutErrorMessage: "Quá thời gian chờ dịch vụ",
    };

    if (params) {
      if (typeof method === "string" && method.toLowerCase().trim() === "get") {
        requestConfig.params = params;
      } else {
        requestConfig.data = params;
      }
    }

    // console.log('ducnh requestConfig', requestConfig);

    return axios(requestConfig)
      .then((response) => {
        // console.log('API.Response:', response);

        const { data, status, error } = response;

        if (status !== 200 && status !== 201) {
          throw Error(error);
        }

        return data;
      })
      .catch((error) => {
        if (error?.response?.data) {
          const { message } = error.response.data;
          return Promise.reject(message ? new Error(message) : error);
        }
        return Promise.reject(error);
      });
  };
}

export default new API();
