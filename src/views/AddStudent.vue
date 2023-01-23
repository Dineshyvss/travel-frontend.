<template>
  <div id="body">
    <h1>Student Add</h1>
    <h4>{{ student.firstName }} {{ student.lastName }}</h4>
    <br />
    <div class="form">
      <label for="id">ID</label>
      <br />
      <input v-model="student.idNumber" type="text" id="id" />
      <span id="idNumberErr" class="error">{{ errors.idNumber || "*" }}</span>
      <br />

      <div class="form-group">
        <label for="fname">First Name</label>
        <input v-model="student.firstName" type="text" id="fname" />
      </div>
      <label for="fname">First Name</label>
      <br />
      <input v-model="student.firstName" type="text" id="fname" />
      <span id="firstNameErr" class="error">{{ errors.firstName || "*" }}</span>
      <br />

      <label for="lname">Last Name</label>
      <br />
      <input v-model="student.lastName" type="text" id="lname" />
      <span id="lastNameErr" class="error">{{ errors.lastName || "*" }}</span>
      <br />

      <label for="zip">ZIP</label>
      <br />
      <input
        v-model="student.zip"
        type="text"
        id="zip"
        v-on:blur="cityStateLookup()"
      />
      <span id="zipErr" class="error">{{ errors.zip || "*" }}</span>
      <br />

      <label for="city">City</label>
      <br />
      <input v-model="student.city" type="text" id="city" />
      <span id="cityErr" class="error">{{ errors.city || "*" }}</span>
      <br />

      <label for="state">State</label>
      <br />
      <input v-model="student.state" type="text" id="state" />
      <span id="stateErr" class="error">{{ errors.state || "*" }}</span>
      <br />

      <label for="email">Email</label>
      <br />
      <input v-model="student.email" type="text" id="email" />
      <span id="emailErr" class="error">{{ errors.email || "*" }}</span>
      <br />

      <label for="classification">Classification</label>
      <br />
      <select v-model="student.classification" id="classification">
        <option value="FR">Freshman</option>
        <option value="SO">Sophomore</option>
        <option value="JR">Junior</option>
        <option value="SR">Senior</option>
      </select>
      <span id="classificationErr" class="error">{{
        errors.classification || "*"
      }}</span>
      <br />

      <label for="gender">Gender</label>
      <br />
      <select v-model="student.gender" id="gender">
        <option value="F">Female</option>
        <option value="M">Male</option>
      </select>
      <span id="genderErr" class="error">{{ errors.gender || "*" }}</span>
    </div>
    <br />
    <br />
    <button class="success" name="Save" v-on:click.prevent="addStudent()">
      ADD
    </button>
    <button name="Cancel" v-on:click.prevent="cancel()">CANCEL</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      student: {},
      errors: {},
    };
  },
  methods: {
    addStudent() {
      axios
        .post("http://localhost/api/students/", this.student)
        .then(() => {
          this.$router.push({ name: "list" });
        })
        .catch((error) => {
          if (error.response.status == "406") {
            this.errors = {};
            for (let obj of error.response.data) {
              this.$set(this.errors, obj.attributeName, obj.message);
            }
          }
        });
    },
    cancel() {
      this.$router.push({ name: "list" });
    },
    cityStateLookup() {
      if (this.student.zip != "") {
        axios
          .get("http://localhost/api/zip/" + this.student.zip, {
            crossOrigin: true,
          })
          .then((response) => {
            this.$set(this.student, "city", response.data.city);
            this.$set(this.student, "state", response.data.state_code);
          })
          .catch((error) => {
            console.log("There was an error:", error.response);
          });
      }
    },
  },
};
</script>
