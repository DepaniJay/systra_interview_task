import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorageItems } from "./utils/common";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 30000, // 30 secs
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  validateStatus: function (status) {
    return (
      (status >= 200 && status < 300) ||
      status === 401 ||
      status === 403 ||
      status === 422 ||
      status === 400 ||
      status === 404
    ); // default
  },
});

export async function post(url, paramObj = {}, headers = {}) {
  const { token } = getLocalStorageItems();
  instance.defaults.headers.common["Authorization"] = "Bearer " + token;

  return instance
    .post(url, paramObj)
    .then((response) => {
      return response?.data;
    })
    .then((response) => {
      if (response?.status === "1") {
        return response;
      } else if (response?.status === "2") {
        localStorage.clear();
        toast.error(response?.message);
        setTimeout(() => {
          window.location.href = "/signin";
        }, 3000);
      } else {
        return response;
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error.message || "Something went to wrong! Try again later",
      };
    });
}

export async function put(url, paramObj = {}, headers = {}) {
  const { token } = getLocalStorageItems();
  instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  return instance
    .put(url, paramObj)
    .then((response) => {
      return response?.data;
    })
    .then((response) => {
      if (response?.status === "1") {
        return response;
      } else if (response?.status === "2") {
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "/signin";
        }, 3000);
        toast.error(response?.message);
      } else {
        return response;
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error.message || "Something went to wrong! Try again later",
      };
    });
}

export async function patch(url, paramObj = {}, headers = {}) {
  const { token } = getLocalStorageItems();
  instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  return instance
    .patch(url, paramObj)
    .then((response) => {
      return response?.data;
    })
    .then((response) => {
      if (response?.status === "1") {
        return response;
      } else if (response?.status === "2") {
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "/signin";
        }, 3000);
        toast.error(response?.message);
      } else {
        return response;
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error.message || "Something went to wrong! Try again later",
      };
    });
}

export async function get(url, paramObj = {}, headers = {}) {
  const { token } = getLocalStorageItems();
  instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  return instance
    .get(url, { params: paramObj })
    .then((response) => {
      return response?.data;
    })
    .then((response) => {
      if (response?.status === "1") {
        return response;
      } else if (response?.status === "2") {
        localStorage.clear();
        toast.error(response?.message);
        setTimeout(() => {
          window.location.href = "/signin";
        }, 3000);
      } else {
        return response;
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error.message || "Something went wrong! Try again later",
      };
    });
}

export async function deleteM(url, payload = {}, headers = {}) {
  const { token } = getLocalStorageItems();
  instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  return instance
    .delete(url, { data: payload })
    .then((response) => {
      return response?.data;
    })
    .then((response) => {
      if (response?.status === "1") {
        return response;
      } else if (response?.status === "2") {
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "/signin";
        }, 3000);
        toast.error(response?.message);
      } else {
        return response;
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error.message || "Something went wrong! Try again later",
      };
    });
}
