<template>
  <div id="body">
    <h1>Student Edit</h1>
    <h4>{{ student.firstName }} {{ student.lastName }}</h4>
    <br />
    <div class="form">
      <div class="form-group">
        <label for="idNumber">
          OC ID Number
          <span id="idNumberErr" class="text-error">{{
            errors.idNumber || "*"
          }}</span>
        </label>
        <input v-model="student.idNumber" type="text" id="idNumber" />
      </div>

      <div class="form-group">
        <label for="fname">
          First Name
          <span id="firstNameErr" class="text-error">{{
            errors.firstName || "*"
          }}</span>
        </label>
        <input v-model="student.firstName" type="text" id="fname" />
      </div>

      <div class="form-group">
        <label for="lname">
          Last Name
          <span id="lastNameErr" class="text-error">{{
            errors.lastName || "*"
          }}</span>
        </label>
        <input v-model="student.lastName" type="text" id="lname" />
      </div>

      <div class="form-group">
        <label for="zip">
          ZIP
          <span id="zipErr" class="text-error">{{ errors.zip || "*" }}</span>
        </label>
        <input
          v-model="student.zip"
          type="text"
          id="zip"
          v-on:blur="cityStateLookup()"
        />
      </div>

      <div class="form-group">
        <label for="city">
          City
          <span id="cityErr" class="text-error">{{ errors.city || "*" }}</span>
        </label>
        <input v-model="student.city" type="text" id="city" />
      </div>

      <div class="form-group">
        <label for="state">
          State
          <span id="stateErr" class="text-error">{{
            errors.state || "*"
          }}</span>
        </label>
        <input v-model="student.state" type="text" id="state" />
      </div>

      <div class="form-group">
        <label for="email">
          Email
          <span id="emailErr" class="text-error">{{
            errors.email || "*"
          }}</span>
        </label>
        <input v-model="student.email" type="text" id="email" />
      </div>

      <div class="form-group">
        <label for="classification">
          Classification
          <span id="classificationErr" class="text-error">{{
            errors.classification || "*"
          }}</span>
        </label>
        <select v-model="student.classification" id="classification">
          <option value="FR">Freshman</option>
          <option value="SO">Sophomore</option>
          <option value="JR">Junior</option>
          <option value="SR">Senior</option>
        </select>
      </div>

      <div class="form-group">
        <label for="gender">
          Gender
          <span id="genderErr" class="text-error">{{
            errors.gender || "*"
          }}</span>
        </label>
        <select v-model="student.gender" id="gender">
          <option value="F">Female</option>
          <option value="M">Male</option>
        </select>
      </div>
    </div>
    <br />
    <button class="success" name="Save" v-on:click.prevent="updateStudent()">
      Update
    </button>
    <button name="cancel" v-on:click.prevent="cancel()">Cancel</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],

  data() {
    return {
      student: {},
      errors: {},
    };
  },
  created() {
    axios
      .get("http://localhost/api/students/" + this.id, { crossOrigin: true })
      .then((response) => {
        this.student = response.data[0];
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },

  methods: {
    updateStudent() {
      axios
        .put("http://localhost/api/students/" + this.id, this.student)
        .then(() => {
          this.$router.push({ name: "lists" });
        })
        .catch((error) => {
          if (error.response.status == "406") {
            this.errors = {};
            for (let obj of error.response.data) {
              this.errors[obj.attributeName] = obj.message;
            }
          } else {
            if (error.response.data.attributeName === undefined) {
              error.response.data.attributeName = "idNumber";
            }
            this.errors[error.response.data.attributeName] =
              error.response.data.error.sqlMessage;
          }
        });
    },
    cancel() {
      this.$router.push({ name: "lists" });
    },
    cityStateLookup() {
      if (this.student.zip != "") {
        axios
          .get("http://localhost/api/zip/" + this.student.zip, {
            crossOrigin: true,
          })
          .then((response) => {
            this.student.city = response.data.city;
            this.student.state = response.data.state_code;
          })
          .catch((error) => {
            console.log("There was an error:", error.response);
          });
      }
    },
  },
};
</script>

<style></style>
