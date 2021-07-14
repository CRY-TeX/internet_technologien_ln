<template>
  <div class="card" @click.self="show_chat()">
    <MealAnswerCard
      v-if="last_response?.answer_message?.meal_item !== undefined"
      :meal_item="last_response.answer_message.meal_item"
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
  import MealAnswerCard from './MealAnswerCard.vue';

  import { IApiResponse } from '@/types/api_response_data.interface';

  export default defineComponent({
    name: 'AnswerCard',
    components: {
      MealAnswerCard,
    },
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
