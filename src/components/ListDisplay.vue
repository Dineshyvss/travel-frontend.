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
import axios from "axios";
export default {
  props: {
    list: Object,
  },
  data() {
    return {
      show: false,
      errors: [],
    };
  },
  emits: ["deletedList"],
  setup(props, { emit }) {
    const deletedList = (event) => {
      emit("deletedList");
    };
    return {
      deletedList,
    };
  },
  methods: {
    deleteList() {
      axios
        .delete("http://localhost/todoapi/lists/" + this.list.id)
        .then((response) => {
          this.errors = response.data;
          this.show = false;
          this.deletedList();
        })
        .catch((error) => {
          this.errors = error.data;
        });
    },
  },
};
</script>

<style></style>
