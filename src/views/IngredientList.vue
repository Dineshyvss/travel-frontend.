<script setup>
import { onMounted } from "vue";
import { ref, reactive } from "vue";
import IngredientServices from "../services/IngredientServices.js";

const ingredients = ref([]);
const isAdd = ref(false);
const snackbar = reactive({
  value: false,
  color: "",
  text: "",
});
const newIngredient = reactive({
  name: "",
  unit: "",
  pricePerUnit: 0.0,
});

onMounted(async () => {
  await getIngredients();
});

async function getIngredients() {
  await IngredientServices.getIngredients()
    .then((response) => {
      ingredients.value = response.data;
      console.log(ingredients);
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = true;
      snackbar.color = "error";
      snackbar.text = error.response.data.message;
    });
}

async function addIngredient() {
  console.log(newIngredient.name);
  isAdd.value = false;
  await IngredientServices.addIngredient(newIngredient)
    .then(() => {
      snackbar.value = true;
      snackbar.color = "green";
      snackbar.text = `${newIngredient.name} added successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = true;
      snackbar.color = "error";
      snackbar.text = error.response.data.message;
    });
  await getIngredients();
}

function openAdd() {
  isAdd.value = true;
}

function closeSnackBar() {
  snackbar.value = false;
}
</script>

<template>
  <v-container>
    <div id="body">
      <v-row align="center" class="mb-4">
        <v-col cols="10"
          ><v-card-title class="text-h4 font-weight-bold"
            >Ingredients
          </v-card-title>
        </v-col>
        <v-col class="d-flex justify-end" cols="2">
          <v-btn color="accent" @click="openAdd()">Add</v-btn>
        </v-col>
      </v-row>

      <v-table>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Unit</th>
            <th class="text-left">Price Per Unit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in ingredients" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.unit }}</td>
            <td>${{ item.pricePerUnit }}</td>
          </tr>
        </tbody>
      </v-table>

      <v-dialog v-model="isAdd" width="800">
        <v-card>
          <v-card-item>
            <v-card-title class="headline mb-2">Add Ingredient </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-text-field
              v-model="newIngredient.name"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="newIngredient.unit"
              label="Unit"
            ></v-text-field>
            <v-text-field
              v-model.number="newIngredient.pricePerUnit"
              label="Price Per Unit"
              type="number"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="primary" @click="addIngredient()"
              >Add Ingredient</v-btn
            >
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
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>
