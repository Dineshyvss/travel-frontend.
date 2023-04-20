<template>
  <div id="body">
    <h1>Login</h1>
    <br />
    <p class="text-error">{{ message }}</p>

    <div class="form">
      <div class="form-group">
        <label for="username"> Username </label>
        <input v-model="user.username" type="text" id="username" />
      </div>

      <div class="form-group">
        <label for="password"> Password </label>
        <input v-model="user.password" type="text" id="password" />
      </div>

      <br />
      <button class="success" name="Login" v-on:click.prevent="login()">
        Login
      </button>
      <button @click="this.show = true">Create Account</button>
    </div>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <span @click="this.show = false" class="close">&times;</span>
          <p>Create a To-Do List Account</p>
        </div>
        <br />
        <div class="modal-body">
          <p class="text-error">{{ message }}</p>
          <div class="form" style="font-size: 1rem">
            <div class="form-group">
              <label for="firstName"> First Name </label>
              <input v-model="newUser.firstName" type="text" id="firstName" />
            </div>

            <div class="form-group">
              <label for="lastName"> Last Name </label>
              <input v-model="newUser.lastName" type="text" id="lastName" />
            </div>
            <div class="form-group">
              <label for="username"> Username </label>
              <input v-model="newUser.username" type="text" id="username" />
            </div>

            <div class="form-group">
              <label for="password"> Password </label>
              <input v-model="newUser.password" type="text" id="password" />
            </div>
            <br />
            <button class="success" v-on:click="createAccount()">Create</button>
            <button v-on:click="this.show = false">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListServices from "../services/ListServices.js";

export default {
  data() {
    return {
      show: false,
      user: {
        username: "",
        password: "",
      },
      newUser: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
      },
      message: "",
    };
  },
  methods: {
    login() {
      ListServices.loginUser(this.user)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          this.$router.push({ name: "lists" });
        })
        .catch((error) => {
          console.log(error);
          this.message = error.response.data.message;
        });
    },
    createAccount() {
      ListServices.addUser(this.newUser)
        .then(() => {
          this.show = false;
          this.message = "User successfully created. Please log in.";
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
  },
};
</script>

<style></style>
