<script setup>
import { reactive, ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  recipeStep: {
    required: true,
  },
});

const emits = defineEmits(["deleteStep", "updateStep"]);

const editItem = ref(false);
const show = ref(false);
</script>

<template>
  <v-row>
    <v-col cols="1">
      <v-text-field
        v-model="recipeStep.stepNumber"
        :readonly="!editItem"
        type="number"
      ></v-text-field>
    </v-col>
    <v-col cols="8">
      <v-textarea
        v-model="recipeStep.description"
        :readonly="!editItem"
        rows="2"
      ></v-textarea>
    </v-col>
    <v-col cols="3">
      <v-btn v-if="!editItem" :readonly="!editItem" @click="editItem = true"
        >Edit</v-btn
      >
      <v-btn
        v-if="editItem"
        @click="
          updateStep();
          editItem = false;
        "
      >
        Save
      </v-btn>
      <v-btn @click="this.show = true">Delete</v-btn>
    </v-col>
  </v-row>

  <div v-if="show" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span @click="this.show = false" class="close">&times;</span>
        <p>Are you sure you want to delete {{ item.name }}?</p>
      </div>
      <br />
      <div class="modal-body">
        <button v-on:click="this.show = false">No, cancel</button>
        <button class="error" v-on:click="deleteItem()">Yes, delete</button>
      </div>
    </div>
  </div>
</template>
