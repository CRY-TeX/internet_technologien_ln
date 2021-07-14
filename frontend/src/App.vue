<template>
  <router-view />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',

    created: function(): void {
      // TODO: define on close event
      this.$store.commit('connect_ws');
    },
  });
</script>

<style>
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Poppins', sans-serif;
    color: #666666;
  }
</style>
