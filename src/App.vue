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
            <router-link :to="{ name: 'list' }">
              <img :src="logoURL" contain />
            </router-link>
          </li>
          <li>
            <a>{{ title }}</a>
          </li>
        </div>
      </ul>
      <ul class="nav-links">
        <div class="menu">
          <li>
            <router-link :to="{ name: 'list' }"><a>LIST</a></router-link>
          </li>
          <li>
            <router-link :to="{ name: 'addStudent' }"
              ><a>ADD STUDENT</a></router-link
            >
          </li>
        </div>
      </ul>
    </nav>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  components: {
    ocLogo,
  },
  data() {
    return {
      title: "Student Listing",
      logoURL: "",
    };
  },
  created() {
    this.logoURL = ocLogo;
  },
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  font-size: 1rem;
  text-align: center;
  color: #2c3e50;
}

#body {
  padding: 40px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 20px;
  background-color: white;
  color: #2c3e50;
}

.nav-links .menu a {
  color: #2c3e50;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  font-size: 0.875rem;
}

.title {
  display: flex;
  gap: 1em;
  font-size: 1.25rem;
  font-weight: 400;
  align-items: center;
}

.title img {
  display: flex;
  flex: 1 0 0px;
  height: 50px;
  width: 50px;
  z-index: 0;
  object-fit: contain;
  overflow: hidden;
  position: relative;
  top: 0;
  left: 0;
  max-width: 100%;
  max-height: 100%;
}

.menu {
  display: flex;
  gap: 1em;
  font-size: 18px;
}

.menu li:hover {
  background-color: #ececec;
  border-radius: 5px;
  transition: 0.3s ease;
}

.menu li {
  padding: 5px 14px;
}

button {
  align-items: center;
  border-radius: 4px;
  display: inline-grid;
  cursor: pointer;
  gap: 1em;
  box-shadow: 0 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0 2px 2px 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0 1px 5px 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  min-width: 64px;
  margin: 0px 20px 0px 20px;
  height: 36px;
  outline: none;
  padding: 0 16px;
  color: #2c3e50;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  font-size: 0.875rem;
  text-transform: uppercase;
  text-decoration: none;
  border-color: rgba(var(--v-border-color), var(--v-border-opacity));
  border-style: solid;
  border-width: 0;
}

.shadow {
  box-shadow: 0px 5px 10px 1px rgba(169, 169, 169, 0.5);
}

.grid-container {
  display: grid;
  gap: 20px 20px;
  grid-template-columns: 150px 120px 150px;
  padding: 10px;
  align-content: center;
  justify-content: center;
}

.grid-item {
  padding: 5px;
  margin: auto;
  text-align: center;
}

.modal {
  display: block;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-header {
  padding: 2px 16px;
}

.modal-body {
  padding: 2px 16px;
}

.modal-content {
  position: relative;
  padding: 0;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border-radius: 4px;
  width: 80%; /* Could be more or less, depending on screen size */
  align-items: center;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  word-break: break-all;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.error {
  color: white;
  background-color: #ee5044;
}
</style>
