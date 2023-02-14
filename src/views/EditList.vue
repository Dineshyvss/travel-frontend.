<template>
  <div id="body">
    <h1>Edit List</h1>
    <h4>{{ list.name }}</h4>

    <p>{{ message }}</p>
    <div class="form">
      <div class="form-group">
        <label for="name"> Name </label>
        <input v-model="list.name" type="text" id="name" />
      </div>

      <br />
      <button name="add" v-on:click.prevent="addItemDisplay = true">
        Add Item
      </button>
      <button class="success" name="Save" v-on:click.prevent="updateList()">
        Update List
      </button>
      <button class="error" name="Cancel" v-on:click.prevent="cancel()">
        Cancel
      </button>
    </div>
  </div>

  <div
    class="item-container"
    style="grid-template-columns: 150px 150px 150px 320px"
  >
    <div class="grid-item"><h4>NAME</h4></div>
    <div class="grid-item"><h4>DESCRIPTION</h4></div>
    <div class="grid-item"><h4>STATE</h4></div>
    <div class="grid-item"><h4>ACTIONS</h4></div>
  </div>

  <div class="item-container">
    <ItemDisplay
      v-for="item in items"
      :key="item.id"
      :item="item"
      @deleteItem="deleteItem(item.id)"
      @updateItem="updateItem(item)"
    />
    <ItemAdd
      v-if="addItemDisplay"
      @addItem="addItem"
      @cancelAdd="addItemDisplay = false"
    />
  </div>
</template>

<script>
import ListServices from "../services/ListServices.js";
import ItemDisplay from "../components/ItemDisplay.vue";
import ItemAdd from "../components/ItemAdd.vue";

export default {
  props: ["id"],
  components: {
    ItemDisplay,
    ItemAdd,
  },
  data() {
    return {
      list: {},
      items: {},
      message: "Make updates to the List",
      addItemDisplay: false,
    };
  },
  created() {
    this.getList();
    this.getItems();
  },
  methods: {
    getList() {
      ListServices.getList(this.id)
        .then((response) => {
          this.list = response.data.list;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    getItems() {
      ListServices.getListItems(this.id)
        .then((response) => {
          this.items = response.data.items;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    updateList() {
      ListServices.updateList(this.id, this.list)
        .then(() => {
          this.$router.push({ name: "lists" });
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
    addItem(item) {
      console.log(item);
      ListServices.addListItem(this.id, item)
        .then((response) => {
          item.id = response.data.itemId;
          this.message = "Added Item";
          this.items.push(item);
          this.addItemDisplay = false;
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "lists" });
    },
    updateItem(item) {
      ListServices.updateListItem(this.id, item.id, item).catch((error) => {
        this.message = error.data.message;
      });
    },
    deleteItem(id) {
      ListServices.deleteListItem(this.id, id)
        .then(() => {
          this.items.forEach((item, i) => {
            if (item.id == id) {
              this.items.splice(i, 1);
            }
          });
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
  },
};
</script>
