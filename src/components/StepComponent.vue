<script setup>
import { onMounted } from "vue";

const props = defineProps({
  recipeStep: {
    required: true,
  },
});

onMounted(() => {});

const emit = defineEmits(["updateStep", "deleteStep"]);

const handleUpdate = (event) => {
  console.log(event);
  emit("updateStep", event.target);
};

const handleDelete = (event) => {
  emit("deleteStep", event.target);
};
</script>

<template>
  <v-list-item>
    {{ recipeStep.stepNumber }}

    {{ recipeStep.instruction }}

    <template v-slot:append>
      <v-icon
        size="x-small"
        icon="mdi-pencil"
        @click="handleUpdate(recipeStep)"
      ></v-icon>
      <v-icon
        size="x-small"
        icon="mdi-trash-can"
        @click="handleDelete(recipeStep)"
      ></v-icon>
    </template>

    <v-row>
      <!-- {{ recipeStep.recipeIngredient }} -->
    </v-row>
  </v-list-item>
</template>
