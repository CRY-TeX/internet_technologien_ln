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
    computed: {
      is_ws_connected() {
        return this.$store.state.connected;
      },
    },
    watch: {
      is_ws_connected: function() {
        const interval: number = setInterval(() => {
          if (this.is_ws_connected) {
            clearInterval(interval);
            return;
          }

          this.$store.commit('connect_ws');
        }, 1000);
      },
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
