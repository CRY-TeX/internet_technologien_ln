<template>
  <div class="card" @click.self="show_chat()">
    <img
      class="preview"
      :src="last_response?.answer_message?.preview_url"
      alt="Gericht Preview"
      v-if="last_response?.answer_message?.preview_url !== undefined"
    />

    <button class="btn" @click="show_meals()" v-if="last_response?.meal_list !== undefined">
      Alle Gerichte
    </button>

    <p class="answer">
      {{ last_response?.answer_message?.msg }}
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import router from '../router';

  import { IApiResponse } from '@/types/api_response_data.interface';

  export default defineComponent({
    name: 'AnswerCard',
    methods: {
      show_chat(): void {
        router.push({ name: 'chat' });
      },
      show_meals(): void {
        router.push({ name: 'meals' });
      },
    },
    computed: {
      last_response(): IApiResponse {
        return this.$store.getters.last_api_response;
      },
    },
  });
</script>

<style scoped>
  .card {
    background-color: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 1.5em;
    height: 100%;
    overflow-y: auto;
    max-width: 600px;
    min-width: 30%;
  }

  .card:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }

  .preview {
    width: 80%;
    margin: 0 auto 1em auto;
    display: block;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.05));
    border-radius: 10px;
  }

  .btn {
    font-size: 0.8em;
    color: #ffffff;
    background-color: #8ac734;
    padding: 0.32em 0.8em;
    margin: 0 auto 2.5em auto;
    display: block;
    width: 60%;
    border-radius: 30px;
    border: none;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.05));
    cursor: pointer;
  }

  .btn:hover {
    background: #5c9915;
  }

  .answer {
    font-size: 0.9em;
  }
</style>
