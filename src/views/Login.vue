<template>
  <v-container>
    <div id="body">
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline mb-2">Login</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="user.email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            :rules="passwordRules"
            label="Password"
            required
            type="password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="flat"
            color="secondary"
            @click="openCreateAccount()"
          >Create Account</v-btn>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="login()">Login</v-btn>
        </v-card-actions>
      </v-card>

      <!-- Rest of the code -->

      <v-dialog persistent v-model="isCreateAccount" width="800">
        <v-card class="rounded-lg elevation-5">
          <v-card-title class="headline mb-2">Create Account</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="user.firstName"
              label="First Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.lastName"
              label="Last Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.email"
              :rules="emailRules"
              label="Email"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.password"
              :rules="passwordRules"
              label="Password"
              required
              type="password"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="flat"
              color="secondary"
              @click="closeCreateAccount()"
            >Close</v-btn>
            <v-btn
              variant="flat"
              color="primary"
              @click="createAccount()"
            >Create Account</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}

        <template v-slot:actions>
          <v-btn
            :color="snackbar.color"
            variant="text"
            @click="closeSnackBar()"
          >Close</v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted } from "vue";
import { ref, toRaw, computed } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";

const router = useRouter();
const isCreateAccount = ref(false);
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const user = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

onMounted(async () => {
  if (localStorage.getItem("user") !== null) {
    router.push({ name: "recipes" });
  }
});

function navigateToRecipes() {
  router.push({ name: "recipes" });
}

async function createAccount() {
  try {
    await UserServices.addUser(toRaw(user.value));
    snackbar.value = {
      value: true,
      color: "green",
      text: "Account created successfully!",
    };
    router.push({ name: "login" });
  } catch (error) {
    console.log(error);
    snackbar.value = {
      value: true,
      color: "error",
      text: error.response.data.message,
    };
  }
}

async function login() {
  try {
    const response = await UserServices.loginUser(toRaw(user.value));
    const data = response.data;
    window.localStorage.setItem("user", JSON.stringify(data));
    snackbar.value = {
      value: true,
      color: "green",
      text: "Login successful!",
    };
    router.push({ name: "recipes" });
  } catch (error) {
    console.log(error);
    snackbar.value = {
      value: true,
      color: "error",
      text: error.response.data.message,
    };
  }
}

function openCreateAccount() {
  isCreateAccount.value = true;
}

function closeCreateAccount() {
  isCreateAccount.value = false;
}

function closeSnackBar() {
  snackbar.value.value = false;
}

const emailRules = computed(() => [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "Email must be valid",
]);

const passwordRules = computed(() => [
  (v) => !!v || "Password is required",
  (v) => v && v.length >= 8 || "Password must be at least 8 characters",
]);
</script>
