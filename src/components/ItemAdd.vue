<template>
  <div class="grid-item">
    <input type="text" v-model="item.name" />
  </div>
  <div class="grid-item">
    <input type="text" v-model="item.description" />
  </div>
  <div class="grid-item">
    <select v-model="item.state" id="state">
      <option value="in-progress">in-progress</option>
      <option value="complete">complete</option>
      <option value="canceled">canceled</option>
    </select>
  </div>
  <div class="grid-item">
    <button @click="addItem(item)">
      <span>Save</span>
    </button>
  </div>
  <div class="grid-item">
    <button @click="cancelAdd">
      <span>Cancel</span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {
        state: "in-progress",
      },
    };
  },
  emits: ["addItem", "cancelAdd"],
  setup(props, { emit }) {
    const addItem = (item) => {
      emit("addItem", item);
    };
    const cancelAdd = (event) => {
      emit("cancelAdd");
    };
    return {
      addItem,
      cancelAdd,
    };
  },
  methods: {},
};
</script>

<style></style>
