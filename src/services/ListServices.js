import axios from "axios";

var baseurl = "";
if (process.env.NODE_ENV === "development") {
  baseurl = "http://localhost/todoapi/";
} else {
  baseurl = "/todoapi/";
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

export default {
  getLists() {
    return apiClient.get("lists");
  },
  getList(id) {
    return apiClient.get("lists/" + id);
  },
  addList(list) {
    return apiClient.post("lists", list);
  },
  updateList(listId, list) {
    return apiClient.put("lists/" + listId, list);
  },
  deleteList(listId) {
    return apiClient.delete("lists/" + listId);
  },
  getListItems(listId) {
    return apiClient.get("lists/" + listId + "/items");
  },
  addListItem(listId, item) {
    return apiClient.post("lists/" + listId + "/items", item);
  },
  updateListItem(listId, itemId, item) {
    return apiClient.put("lists/" + listId + "/items/" + itemId, item);
  },
  deleteListItem(listId, itemId) {
    return apiClient.delete("lists/" + listId + "/items/" + itemId);
  },
  getUser() {
    return apiClient.get("users");
  },
  addUser(user) {
    return apiClient.post("users", user);
  },
  loginUser(user) {
    return apiClient.post("users/login", user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        crossDomain: true,
        Authorization: "Basic " + btoa(user.username + ":" + user.password),
      },
    });
  },
  logoutUser() {
    return apiClient.post("users/logout");
  },
};
