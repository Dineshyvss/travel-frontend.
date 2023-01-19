<template>
  <div id="body">
    <h1>Student List</h1>
    <br />
    <div class="grid-container">
      <StudentDisplay
        v-for="student in students"
        :key="student.id"
        :student="student"
        @deletedStudent="getStudents()"
      />
    </div>
  </div>
</template>

<script>
import StudentDisplay from "../components/StudentDisplay.vue";
import axios from "axios";
export default {
  components: {
    StudentDisplay,
  },
  data() {
    return {
      students: [],
    };
  },
  created() {
    this.getStudents();
  },
  methods: {
    getStudents() {
      axios
        .get("http://localhost/api/students", { crossOrigin: true })
        .then((response) => {
          this.students = response.data;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
  },
};
</script>

<style></style>
