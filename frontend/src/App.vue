<template>
  <router-view />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { IApiResponse } from '@/types/api_response_data.interface';

  export default defineComponent({
    name: 'App',

    created: function(): void {
      this.$store.state.socket = new WebSocket('ws://localhost:3000');

      // TODO: define on close event

      this.$store.state.socket.onmessage = ({ data }) => {
        console.log(data);

        try {
          let json_data: IApiResponse = JSON.parse(data);
          this.$store.state.api_responses.push(json_data);
        } catch (error) {
          console.error(error);
        }
      };
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
