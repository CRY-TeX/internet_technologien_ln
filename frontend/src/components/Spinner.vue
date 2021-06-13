<template>
  <img class="spinner" src="../assets/unsure_cook_icon.png" alt="spinner" />
</template>

<script>
  // TODO: implement three.js animation in here

  export default {
    name: 'Spinner',
  };
</script>

<style scoped>
  .spinner {
    height: 2.6rem;
    margin: 0 auto;
    display: block;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.08));
    margin-bottom: 1rem;
  }
</style>
