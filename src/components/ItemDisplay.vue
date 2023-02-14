<template>
  <div class="grid-item">
    <span v-if="!editItem">{{ item.name }}</span>
    <input v-model="item.name" type="text" v-if="editItem" />
  </div>
  <div class="grid-item">
    <span v-if="!editItem">{{ item.description }}</span>
    <input v-model="item.description" type="text" v-if="editItem" />
  </div>
  <div class="grid-item">
    <span v-if="!editItem">{{ item.state }}</span>
    <select v-if="editItem" v-model="item.state" id="state">
      <option value="in-progress">in-progress</option>
      <option value="complete">complete</option>
      <option value="canceled">canceled</option>
    </select>
  </div>
  <div class="grid-item">
    <button v-if="!editItem" @click="editItem = true">Edit</button>
    <button
      v-if="editItem"
      @click="
        updateItem();
        editItem = false;
      "
    >
      Save
    </button>
  </div>
  <div class="grid-item">
    <button @click="this.show = true">Delete</button>
  </div>

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

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      editItem: false,
      show: false,
    };
  },
  emits: ["deleteItem", "updateItem"],
  setup(props, { emit }) {
    const deleteItem = (event) => {
      emit("deleteItem");
    };
    const updateItem = (event) => {
      emit("updateItem");
    };
    return {
      deleteItem,
      updateItem,
    };
  },
};
</script>

<style></style>
