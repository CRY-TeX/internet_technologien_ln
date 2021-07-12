<template>
  <div class="card">
    <img class="preview" :src="api_response.answer_message.preview_url" alt="Gericht Preview" />

    <button class="btn" @click="show_meals()" v-if="api_response?.meal_list !== undefined">
      Alle Gerichte
    </button>

    <p class="answer">
      {{ api_response.answer_message.msg }}
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import router from '../../router';

  import { IApiResponse } from '@/types/api_response_data.interface';

  // TODO: rename component
  export default defineComponent({
    name: 'AnswerCard',
    props: {
      api_response: {
        type: Object as PropType<IApiResponse>,
        required: true,
      },
    },
    methods: {
      show_meals() {
        router.push({ name: 'meals' });
      },
    },
  });
</script>

<style scoped>
  .card {
    background: #f5f5f5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
    border-radius: 10px;
    padding: 1.5em;
    /* height: 100%; */
    /* overflow-y: auto; */
    max-width: 450px;
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
