<template>
  <div id="body">
    <h1>Student Edit</h1>
    <h4>{{ student.firstName }} {{ student.lastName }}</h4>
    <br />
    Id:
    <input v-model="student.idNumber" type="text" id="id" />
    <span id="idNumberErr" class="error">{{ errors.idNumber || "*" }}</span>
    <br />
    <br />Fist Name:
    <input v-model="student.firstName" type="text" id="firstName" />
    <span id="firstNameErr" class="error">{{ errors.firstName || "*" }}</span>
    <br />
    <br />Last Name:
    <input v-model="student.lastName" type="text" id="lastName" />
    <span id="lastNameErr" class="error">{{ errors.lastName || "*" }}</span>
    <br />
    <br />Zip:
    <input
      v-model="student.zip"
      type="text"
      id="zip"
      v-on:blur="cityStateLookup()"
    />
    <span id="zipErr" class="error">{{ errors.zip || "*" }}</span>
    <br />
    <br />City:
    <input v-model="student.city" type="text" id="city" />
    <span id="cityErr" class="error">{{ errors.city || "*" }}</span>
    <br />
    <br />State:
    <input v-model="student.state" type="text" id="state" />
    <span id="stateErr" class="error">{{ errors.state || "*" }}</span>
    <br />
    <br />E-mail:
    <input v-model="student.email" type="text" id="email" />
    <span id="emailErr" class="error">{{ errors.email || "*" }}</span>
    <br />
    <br />Classification:
    <input
      v-model="student.classification"
      type="radio"
      name="classification"
      value="FR"
    />Freshman
    <input
      v-model="student.classification"
      type="radio"
      name="classification"
      value="SO"
    />Sophmore
    <input
      v-model="student.classification"
      type="radio"
      name="classification"
      value="JR"
    />Junior
    <input
      v-model="student.classification"
      type="radio"
      name="classification"
      value="SR"
    />Senior
    <span id="classificationErr" class="error">{{
      errors.classification || "*"
    }}</span>
    <br />
    <br />Gender:
    <input
      v-model="student.gender"
      type="radio"
      name="gender"
      value="F"
    />Female
    <input v-model="student.gender" type="radio" name="gender" value="M" />Male
    <span id="genderErr" class="error">{{ errors.gender || "*" }}</span>
    <br />
    <br />
    <button name="Save" v-on:click.prevent="updateStudent()">UPDATE</button>
    <button name="cancel" v-on:click.prevent="cancel()">CANCEL</button>
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
