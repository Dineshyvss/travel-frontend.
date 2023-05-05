import apiClient from "./services";

export default {
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
