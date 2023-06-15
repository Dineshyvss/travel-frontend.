<template>
  <v-container>
    <div id="body">
      <v-row align="center" class="mb-4">
        <v-col cols="10">
          <v-card-title class="pl-0 text-h4 font-weight-bold">
            Subscribers
          </v-card-title>
        </v-col>
      </v-row>

      <v-table class="rounded-lg elevation-5">
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Contact</th>
           
          </tr>
        </thead>
        <tbody>
          <tr v-for="subscriber in subscribers" :key="subscriber.id">
            <td>
              <v-text-field
                v-model="subscriber.name"
                :disabled="!subscriber.editing"
                label="Name"
                maxlength="10"
              ></v-text-field>
            </td>
            <td>{{ subscriber.email }}</td>
            <td>
              <v-text-field
                v-model="subscriber.contact"
                :disabled="!subscriber.editing"
                label="Contact"
                maxlength="10"
                pattern="[0-9]{10}"
              ></v-text-field>
            </td>
           
          </tr>
        </tbody>
      </v-table>

      <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}

        <template v-slot:actions>
          <v-btn
            :color="snackbar.color"
            variant="text"
            @click="closeSnackBar()"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>


<script>
import { onMounted, ref } from "vue";
import axios from "axios";

export default {
  name: "SubscribersPage",
  setup() {
    const subscribers = ref([]);
    const snackbar = ref({
      value: false,
      color: "",
      text: "",
    });

    onMounted(async () => {
      try {
        const response = await axios.get("http://localhost:3201/travelapi/subscribe");
        subscribers.value = response.data;
      } catch (error) {
        console.log(error);
        snackbar.value.value = true;
        snackbar.value.color = "error";
        snackbar.value.text = "Failed to fetch subscribers.";
      }
    });

    function closeSnackBar() {
      snackbar.value.value = false;
    }

    function editSubscriber(subscriber) {
      subscriber.editing = true;
    }

    function saveSubscriber(subscriber) {
      axios
        .put(`http://localhost:3201/travelapi/subscribe/${subscriber.id}`, {
          name: subscriber.name,
          contact: subscriber.contact,
        })
        .then((response) => {
          console.log("Subscriber saved:", response.data);
          subscriber.editing = false;
          snackbar.value.value = true;
          snackbar.value.color = "success";
          snackbar.value.text = "Subscriber saved successfully.";
        })
        .catch((error) => {
          console.error("Error saving subscriber:", error);
          snackbar.value.value = true;
          snackbar.value.color = "error";
          snackbar.value.text = "Failed to save subscriber.";
        });
    }

    return {
      subscribers,
      snackbar,
      closeSnackBar,
      editSubscriber,
      saveSubscriber,
    };
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}
</style>
