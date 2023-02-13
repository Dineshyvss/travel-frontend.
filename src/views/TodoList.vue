<template>
  <div id="body">
    <h1>To-Do Lists</h1>
    <br />
    <div class="grid-container">
      <ListDisplay
        v-for="list in lists"
        :key="list.id"
        :list="list"
        @deletedList="getLists()"
      />
    </div>
  </div>
</template>

<script>
import ListDisplay from "../components/ListDisplay.vue";
import axios from "axios";
export default {
  components: {
    ListDisplay,
  },
  data() {
    return {
      lists: [],
    };
  },
  created() {
    this.getLists();
  },
  methods: {
    getLists() {
      axios
        .get("http://localhost/todoapi/lists/", { crossOrigin: true })
        .then((response) => {
          this.lists = response.data;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
  },
};
</script>

<style></style>
