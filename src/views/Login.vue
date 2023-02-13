<template>
  <div id="body">
    <h1>Login</h1>
    <br />

    <div class="form-group">
      <label for="username">
        Username
        <span id="usernameErr" class="text-error">{{
          errors.username || "*"
        }}</span>
      </label>
      <input v-model="user.username" type="text" id="username" />
    </div>

    <div class="form-group">
      <label for="password">
        Password
        <span id="passwordErr" class="text-error">{{
          errors.password || "*"
        }}</span>
      </label>
      <input v-model="user.password" type="text" id="password" />
    </div>

    <button class="success" name="Login" v-on:click.prevent="login()">
      Login
    </button>
    <button @click="this.show = true">Add User</button>

    <div v-if="show" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <span @click="this.show = false" class="close">&times;</span>
          <p>Create a To-Do List Account</p>
        </div>
        <br />
        <div class="modal-body">
          <div class="form-group">
            <label for="fname">
              First Name
              <span id="firstNameErr" class="text-error">{{
                errors.firstName || "*"
              }}</span>
            </label>
            <input v-model="newUser.firstName" type="text" id="fname" />
          </div>

          <div class="form-group">
            <label for="lname">
              Last Name
              <span id="lastNameErr" class="text-error">{{
                errors.lastName || "*"
              }}</span>
            </label>
            <input v-model="newUser.lastName" type="text" id="lname" />
          </div>
          <div class="form-group">
            <label for="username">
              Username
              <span id="usernameErr" class="text-error">{{
                errors.username || "*"
              }}</span>
            </label>
            <input v-model="newUser.username" type="text" id="username" />
          </div>

          <div class="form-group">
            <label for="password">
              Password
              <span id="passwordErr" class="text-error">{{
                errors.password || "*"
              }}</span>
            </label>
            <input v-model="newUser.password" type="text" id="password" />
          </div>
          <br />

          <button class="success" v-on:click="createAccount()">
            Create Account
          </button>
          <button v-on:click="this.show = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
      errors: {},
    };
  },
  created() {},
  methods: {
    login() {
      axios
        .post("http://localhost/todoapi/login", this.user)
        .then(() => {
          this.$router.push({ name: "lists" });
        })
        .catch((error) => {
          if (error.response.data.attributeName === undefined) {
            error.response.data.attributeName = "username";
          }
          this.errors[error.response.data.attributeName] =
            error.response.data.error.sqlMessage;

          console.log("There was an error:", error.response);
        });
    },
    createAccount() {
      axios
        .post("http://localhost/todoapi/users", this.newUser)
        .then(() => {
          this.$router.push({ name: "lists" });
          this.show = false;
        })
        .catch((error) => {
          if (error.response.data.attributeName === undefined) {
            error.response.data.attributeName = "username";
          }
          this.errors[error.response.data.attributeName] =
            error.response.data.error.sqlMessage;

          console.log("There was an error:", error.response);
        });
    },
  },
};
</script>

<style></style>
