<template>
  <MealCard v-if="api_response.answer_message.preview_url !== undefined" :api_response="api_response" />
  <TextMessage v-else :is_user="false" :msg="api_response.answer_message.msg" />
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import TextMessage from '../TextMessage.vue';
  import MealCard from './MealCard.vue';

  import { IApiResponse } from '@/types/api_response_data.interface';

  export default defineComponent({
    name: 'UserMessage',
    components: {
      TextMessage,
      MealCard,
    },
    props: {
      api_response: {
        type: Object as PropType<IApiResponse>,
        required: true,
      },
    },
  });
</script>

<style scoped>
  /*  */
</style>
