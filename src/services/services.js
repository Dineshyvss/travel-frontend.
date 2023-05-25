import axios from "axios";

<<<<<<< HEAD
const baseURL = process.env.NODE_ENV === "development" ? "http://localhost/travelapi/" : "/travelapi/";

const apiClient = axios.create({
  baseURL: baseURL,
=======
var baseurl = "";
if (process.env.NODE_ENV === "development") {
  baseurl = "http://http://ec2-3-94-57-116.compute-1.amazonaws.com/travelapi/";
} else {
  baseurl = "/travelapi/";
}

const apiClient = axios.create({
  baseURL: baseurl,
>>>>>>> origin/deploy_travel
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
