<template>
  <div class="about">
    <h1>About Us</h1>
    <p>Welcome to our travel itinerary website. We aim to provide you with the best travel planning experience.</p>
    <p>Our team of experienced travel enthusiasts has curated a collection of amazing destinations and itineraries to help you explore the world.</p>
    <p>Whether you're a solo traveler, a couple, or a family, we have something for everyone. From adventurous activities to relaxing getaways, we've got you covered.</p>
    <p>Start planning your dream trip today with our user-friendly itinerary builder and personalized recommendations.</p>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  mounted() {
    // Apply custom styles
    this.applyStyles();
  },
  methods: {
    applyStyles() {
      const styles = `
        .about {
          margin-top: 20px;
          padding: 20px;
          background-color: #f8f8f8;
          border-radius: 5px;
        }
      
        h1 {
          font-size: 24px;
          margin-bottom: 10px;
        }
      
        p {
          margin-bottom: 10px;
        }
      `;
      
      const styleTag = document.createElement('style');
      styleTag.innerHTML = styles;
      
      document.head.appendChild(styleTag);
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here if needed */
</style>
