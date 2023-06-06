<template>
  <div class="tours">
    <h1>Tours We Offer</h1>
    <div class="tour-card" v-for="tour in tours" :key="tour.id">
      <img :src="tour.image" :alt="tour.name" class="tour-image" />
      <div class="tour-details">
        <h2>{{ tour.name }}</h2>
        <p>{{ tour.description }}</p>
        <p>Duration: {{ tour.duration }}</p>
        <p>Price: {{ tour.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToursPage',
  data() {
    return {
      tours: [
        {
          id: 1,
          name: 'Adventure Trek',
          description: 'Embark on an adrenaline-pumping trek through breathtaking landscapes.',
          duration: '7 days',
          price: '$999',
          image: ('../assert/adventure-trk.jpg')
        },
        {
          id: 2,
          name: 'Cultural Exploration',
          description: 'Immerse yourself in the rich cultural heritage of diverse communities.',
          duration: '10 days',
          price: '$1299',
        },
        {
          id: 3,
  name: 'Beach Getaway',
  description: 'Relax and unwind on pristine beaches with crystal-clear waters.',
  duration: '5 days',
  price: '$799',
        },
      ],
    };
  },
};
</script>

<style scoped>
.tours {
  margin-top: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.tour-card {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
}

.tour-image {
  width: 200px;
  height: 150px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 5px;
}

.tour-details {
  flex: 1;
}

h2 {
  font-size: 18px;
  margin-bottom: 5px;
}

p {
  margin-bottom: 5px;
}
</style>
