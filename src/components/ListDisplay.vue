<template>
  <div class="grid-item">{{ list.name }}</div>
  <div class="grid-item">
    <router-link
      :to="{ name: 'editList', params: { id: list.id } }"
      custom
      v-slot="{ navigate }"
    >
      <button @click="navigate" role="link">Edit</button>
    </router-link>
  </div>
  <div class="grid-item">
    <button @click="this.show = true" role="link">Delete</button>
  </div>

  <div v-if="show" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span @click="this.show = false" class="close">&times;</span>
        <p>Are you sure you want to delete {{ list.name }}?</p>
      </div>
      <br />
      <div class="modal-body">
        <button v-on:click="this.show = false">No, cancel</button>
        <button class="error" v-on:click="deleteList()">Yes, delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import ListServices from "../services/ListServices.js";

export default {
  props: {
    list: Object,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    deleteList() {
      ListServices.deleteList(this.id)
        .then((response) => {
          this.$router.push({ name: "lists" });
          console.log(response);
        })
        .catch((error) => {
          console.log(error.data);
        });
    },
  },
};
</script>
