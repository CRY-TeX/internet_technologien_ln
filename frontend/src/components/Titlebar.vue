<template>
  <nav class="titlebar">
    <img class="icon" src="../assets/unsure_cook_icon.png" />
    <h1 class="app-name">The Unsure Cook</h1>
    <p class="connection-state">Status: {{ get_connection_status ? 'Verbunden' : 'Keine Verbindung' }}</p>
  </nav>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Titlebar',
    computed: {
      get_connection_status(): boolean {
        return this.$store.state.connected;
      },
    },
  });
</script>

<style scoped>
  .titlebar {
    background: rgba(120, 192, 16, 0.83);
    padding: 0.7rem;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    align-items: center;
    margin-bottom: 2rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
  }

  .icon {
    height: 2em;
    margin-left: 0.4em;
  }

  .app-name {
    font-family: Lora;
    font-style: normal;
    font-weight: bold;
    font-size: 1.2em;
    text-align: center;

    color: #eaeaea;
  }

  .connection-state {
    color: white;
    font-size: 0.8em;
    justify-self: end;
  }
</style>
