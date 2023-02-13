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
        <div class="menu">
          <li>
            <router-link :to="{ name: 'lists' }"><a>LIST</a></router-link>
          </li>
          <li>
            <router-link :to="{ name: 'addList' }"><a>ADD LIST</a></router-link>
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
      title: "To-Do Lists",
      logoURL: "",
    };
  },
  created() {
    this.logoURL = ocLogo;
  },
};
</script>
