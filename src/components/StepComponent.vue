<script setup>
import { reactive, ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  recipeStep: {
    required: true,
  },
  isAdd: {
    required: true,
  },
});

const emits = defineEmits(["addOrUpdateStep", "cancelAdd", "deleteStep"]);

const editItem = ref(false);
const show = ref(false);

function validateAddSave() {
  return props.isAdd || editItem
    ? props.recipeStep.stepNumber == null ||
        props.recipeStep.stepNumber == "" ||
        props.recipeStep.description == null ||
        props.recipeStep.description == ""
    : false;
}
</script>

<template>
  <v-row>
    <v-col cols="2">
      <v-text-field
        v-model="recipeStep.stepNumber"
        :readonly="!editItem && !isAdd"
        type="number"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-textarea
        v-model="recipeStep.description"
        :readonly="!editItem && !isAdd"
        rows="2"
      ></v-textarea>
    </v-col>
    <v-col cols="3">
      <v-btn
        class="mr-8"
        :disabled="validateAddSave()"
        @click="
          isAdd || editItem ? addOrUpdateStep() : null;
          editItem = !editItem;
        "
      >
        {{ isAdd ? "Add" : editItem ? "Save" : "Edit" }}
      </v-btn>
      <v-btn @click="isAdd ? cancelStep() : (this.show = true)">{{
        isAdd ? "Cancel" : "Delete"
      }}</v-btn>
    </v-col>
  </v-row>

  <div v-if="show" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span @click="this.show = false" class="close">&times;</span>
        <p>Are you sure you want to delete {{ recipe.name }}?</p>
      </div>
      <br />
      <div class="modal-body">
        <button v-on:click="this.show = false">No, cancel</button>
        <button class="error" v-on:click="deleteStep()">Yes, delete</button>
      </div>
    </div>
  </div>
</template>
