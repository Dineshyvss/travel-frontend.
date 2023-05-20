<template>
  <div class="book-now">
    <h1>Book Now</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="booking.name" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="booking.email" required>
      </div>
      <div class="form-group">
        <label for="tour">Select Tour:</label>
        <select id="tour" v-model="booking.tour" required>
          <option value="">Select a tour</option>
          <option v-for="tour in tours" :value="tour.id" :key="tour.id">{{ tour.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" v-model="booking.message"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'BookNow',
  data() {
    return {
      booking: {
        name: '',
        email: '',
        tour: '',
        message: ''
      },
      tours: [
        {
          id: 1,
          name: 'Adventure Trek'
        },
        {
          id: 2,
          name: 'Cultural Exploration'
        },
        {
          id: 3,
          name: 'Beach Getaway'
        },
        // Add more tour objects as needed
      ]
    };
  },
  methods: {
    submitForm() {
      // Implement form submission logic here
      console.log('Form submitted:', this.booking);
      // Reset form fields
      this.booking.name = '';
      this.booking.email = '';
      this.booking.tour = '';
      this.booking.message = '';
    }
  }
};
</script>

<style scoped>
.book-now {
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

input,
select,
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
</style>
