<template>
  <div>
    <Titlebar />
    <Spinner />
    <h2 class="user-question">{{ last_query }}</h2>
    <div class="answer-container">
      <AnswerCard :api_response="last_response" />
    </div>
    <SuggestionList />
    <MessageInput />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { IApiResponse } from '@/types/api_response_data.interface';

  import Titlebar from '../components/Titlebar.vue';
  import Spinner from '../components/Spinner.vue';
  import AnswerCard from '../components/AnswerCard.vue';
  import MessageInput from '../components/MessageInput.vue';
  import SuggestionList from '../components/SuggestionList.vue';

  export default defineComponent({
    name: 'Home',
    components: {
      Titlebar,
      Spinner,
      AnswerCard,
      MessageInput,
      SuggestionList,
    },
    computed: {
      last_query(): string {
        const last_query: string | undefined = this.$store.getters.last_api_response?.query;

        return last_query === undefined || last_query === '' ? 'Stellen Sie eine Frage' : last_query;
      },
      last_response(): IApiResponse {
        return this.$store.getters.last_api_response;
      },
    },
  });
</script>

<style scoped>
  .user-question {
    font-size: 1em;
    text-align: center;
    margin-bottom: 2rem;
  }

  .answer-container {
    min-height: 50vh;
    background-image: url('../assets/dark_oak.png');
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.05));
    border-radius: 0px 0px 15px 15px;
    padding: 1.8em;
    margin-bottom: 2rem;
    /* opacity: 0.75; */
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
