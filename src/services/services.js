import axios from "axios";

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost/travelapi/" : "/travelapi/";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    crossDomain: true,
  },
  transformRequest: (data, headers) => {
    let token = null;
    if (localStorage.getItem("user") !== null) {
      token = JSON.parse(localStorage.getItem("user")).token;
    }
    let authHeader = "";
    if (token !== null && token !== "") {
      authHeader = "Bearer " + token;
      headers["Authorization"] = authHeader;
    }
    return JSON.stringify(data);
  },
  transformResponse: function (data) {
    data = JSON.parse(data);
<<<<<<< HEAD
    if (!data.success && data.code === "expired-session") {
=======
    if (!data.success && data.code == "expired-session") {
>>>>>>> origin/deploy_travel
      localStorage.removeItem("user");
    }
    return data;
  },
});

export default apiClient;
