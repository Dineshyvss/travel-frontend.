import axios from "axios";

var baseurl = "";
if (process.env.NODE_ENV === "development") {
  baseurl = "http://localhost/recipeapi/";
} else {
  baseurl = "/recipeapi/";
}

const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    crossDomain: true,
  },
  transformRequest: (data, headers) => {
    let token = localStorage.getItem("token");
    let authHeader = "";
    if (token != null && token != "") {
      authHeader = "Bearer " + token;
      headers["Authorization"] = authHeader;
    }
    return JSON.stringify(data);
  },
  transformResponse: function (data) {
    data = JSON.parse(data);
    if (!data.success && data.code == "expired-session") {
      localStorage.removeItem("token");
    }
    return data;
  },
});

export default apiClient;
