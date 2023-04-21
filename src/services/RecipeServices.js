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

export default {
  getRecipes() {
    return apiClient.get("recipes");
  },
  getRecipe(id) {
    return apiClient.get("recipes/" + id);
  },
  addRecipe(recipe) {
    return apiClient.post("recipes", recipe);
  },
  updateRecipe(recipeId, recipe) {
    return apiClient.put("recipes/" + recipeId, recipe);
  },
  deleteRecipe(recipeId) {
    return apiClient.delete("recipes/" + recipeId);
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
