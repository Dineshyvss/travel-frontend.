<template>
  <div id="body">
    <h1>Add A List</h1>
    <h4>{{ list.name }}</h4>
    <p class="text-error">{{ message }}</p>

    <br />
    <div class="form">
      <div class="form-group">
        <label for="name"> Name </label>
        <input v-model="list.name" type="text" id="name" />
      </div>

      <br />
      <button class="success" name="Save" v-on:click.prevent="addList()">
        Add
      </button>
      <button name="Cancel" v-on:click.prevent="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import ListServices from "../services/ListServices.js";

export default {
  data() {
    return {
      list: {},
      message: "",
    };
  },
  methods: {
    addList() {
      ListServices.addList(this.list)
        .then(() => {
          this.$router.push({ name: "lists" });
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "lists" });
    },
  },
};
</script>
