<template>
  <div class="grid-item">{{ student.firstName }} {{ student.lastName }}</div>
  <div class="grid-item">
    <router-link
      :to="{ name: 'editStudent', params: { id: student.id } }"
      custom
      v-slot="{ navigate }"
    >
      <button @click="navigate" role="link">Edit</button>
    </router-link>
  </div>
  <div class="grid-item">
    <button @click="this.show = true" role="link">Delete</button>
    <!-- <router-link
      :to="{ name: 'deleteStudent', params: { id: student.id } }"
      custom
      v-slot="{ navigate }"
    >
      <button @click="navigate" role="link">Delete</button>
    </router-link> -->
  </div>

  <div v-if="show" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header">
        <span @click="this.show = false" class="close">&times;</span>
        <p>
          Are you sure you want to delete {{ student.firstName }}
          {{ student.lastName }}?
        </p>
      </div>
      <br />
      <div class="modal-body">
        <button v-on:click="this.show = false">No, cancel</button>
        <button class="error" v-on:click="deleteStudent()">Yes, delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    student: Object,
  },
  data() {
    return {
      show: false,
      errors: [],
    };
  },
  emits: ["deletedStudent"],
  setup(props, { emit }) {
    const deletedStudent = (event) => {
      emit("deletedStudent");
    };
    return {
      deletedStudent,
    };
  },
  methods: {
    deleteStudent() {
      axios
        .delete("http://localhost/api/students/" + this.student.id)
        .then((response) => {
          this.errors = response.data;
          this.show = false;
          this.deletedStudent();
        })
        .catch((error) => {
          this.errors = error.data;
        });
    },
  },
};
</script>

<style></style>
