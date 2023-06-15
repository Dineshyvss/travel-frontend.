<template>
  <v-container>
    <div id="body">
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline mb-2">Subscribe to our Newsletter</v-card-title>
        <v-card-text>
          <v-text-field v-model="subscription.name" label="Name" :rules="nameRules" required></v-text-field>
          <v-text-field v-model="subscription.contact" label="Contact" :rules="contactRules" required></v-text-field>
          <v-text-field v-model="subscription.email" label="Email" :rules="emailRules" required></v-text-field>
          <v-textarea v-model="subscription.message" label="Message"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="submitForm">Subscribe</v-btn>
        </v-card-actions>
      </v-card>

      <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}

        <template v-slot:actions>
          <v-btn :color="snackbar.color" variant="text" @click="closeSnackBar">Close</v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      snackbar: {
        value: false,
        color: "",
        text: "",
      },
      subscription: {
        name: "",
        contact: "",
        email: "",
        message: "",
      },
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v && v.length <= 50 || "Name must be less than or equal to 50 characters",
      ],
      contactRules: [
        (v) => !!v || "Contact is required",
        (v) => /^[0-9]{10}$/.test(v) || "Contact must be a 10-digit number",
      ],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("http://localhost:3201/travelapi/subscribe", {
          name: this.subscription.name,
          contact: this.subscription.contact,
          email: this.subscription.email,
          message: this.subscription.message,
        });
        console.log("Form submitted:", response.data);
        this.sendEmail(); // Call the function to send an email
        this.snackbar.value = true;
        this.snackbar.color = "success";
        this.snackbar.text = "Subscription successful!";
        this.resetForm();
      } catch (error) {
        console.error("Error submitting form:", error.response.data.message);
        this.snackbar.value = true;
        this.snackbar.color = "error";
        this.snackbar.text = error.response.data.message || "Error submitting form. Please try again.";
      }
    },
    sendEmail() {
      const emailData = {
        to: "v.yedavelly@eagles.oc.in", // Replace with the recipient email address
        subject: "New Subscription",
        body: `A new subscription has been made:
          Name: ${this.subscription.name}
          Contact: ${this.subscription.contact}
          Email: ${this.subscription.email}
          Message: ${this.subscription.message}`,
      };

      axios.post("http://localhost:3201/send-email", emailData)
        .then((response) => {
          console.log("Email sent:", response.data);
        })
        .catch((error) => {
          console.error("Error sending email:", error.response.data.message);
        });
    },
    resetForm() {
      this.subscription.name = "";
      this.subscription.contact = "";
      this.subscription.email = "";
      this.subscription.message = "";
    },
    closeSnackBar() {
      this.snackbar.value = false;
    },
  },
};
</script>

<style scoped>
#body {
  margin-top: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  height: 100px;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.snackbar {
  position: fixed;
  bottom: 20px;
  left: 20px;
}
</style>
