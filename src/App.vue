<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import ocLogo from "/oc-logo-white.png";
</script>

<template>
  <div id="app">
    <nav class="navbar shadow">
      <ul class="nav-links">
        <div class="title">
          <li>
            <router-link :to="{ name: 'lists' }">
              <img :src="logoURL" contain />
            </router-link>
          </li>
          <li>
            <a>{{ title }}</a>
          </li>
        </div>
      </ul>
      <ul class="nav-links">
        <div v-if="loggedIn" class="menu">
          <li>
            <router-link :to="{ name: 'lists' }"><a>LISTS</a></router-link>
          </li>
          <li>
            <router-link :to="{ name: 'addList' }"><a>ADD LIST</a></router-link>
          </li>
          <li>
            <a v-on:click="logout()">
              LOGOUT {{ user.firstName.toUpperCase() }}
              {{ user.lastName.toUpperCase() }}
            </a>
          </li>
        </div>
      </ul>
    </nav>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import ListServices from "./services/ListServices.js";

export default {
  components: {
    ocLogo,
  },
  data() {
    return {
      title: "To-Do Lists",
      logoURL: "",
      user: {},
      loggedIn: false,
    };
  },
  created() {
    this.logoURL = ocLogo;
    this.getUser();
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      if (
        localStorage.getItem("token") !== null &&
        localStorage.getItem("token") !== "" &&
        localStorage.getItem("token") !== undefined
      ) {
        ListServices.getUser()
          .then((response) => {
            this.user = response.data.user;
            this.loggedIn = true;
          })
          .catch((error) => {
            console.log(error);
            this.loggedIn = false;
            this.user = null;
            localStorage.setItem("token", "");
          });
      }
    },
    logout() {
      ListServices.logoutUser(this.user)
        .then(() => {
          localStorage.setItem("token", "");
          this.$router.push({ name: "login" });
          this.loggedIn = false;
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
  },
};
</script>
