<template>
  <div id="body">
    <h1>To-Do Lists</h1>
    <br />
    <p>{{ message }}</p>

    <div class="grid-container">
      <ListDisplay v-for="list in lists" :key="list.id" :list="list" />
    </div>
  </div>
</template>

<script>
import ListDisplay from "../components/ListDisplay.vue";
import ListServices from "../services/ListServices.js";

export default {
  components: {
    ListDisplay,
  },
  data() {
    return {
      lists: [],
      message: "",
    };
  },
  created() {
    this.getLists();
  },
  methods: {
    getLists() {
      ListServices.getLists()
        .then((response) => {
          this.lists = response.data.lists;
        })
        .catch((error) => {
          console.log(error);
          this.message = error.response.data.message;
        });
    },
  },
};
</script>

<style></style>
