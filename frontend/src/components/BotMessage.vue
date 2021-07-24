<template>
  <AnswerCard
    v-if="api_response.answer_message?.meal_item !== undefined"
    :api_response="api_response"
    :is_chat_view="true"
  />
  <TextMessage
    v-else-if="api_response.answer_message.msg !== ''"
    :is_user="false"
    :msg="api_response.answer_message.msg"
  />
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import AnswerCard from './AnswerCard.vue';
  import TextMessage from './TextMessage.vue';

  import { IApiResponse } from '@/types/api_response_data.interface';

  export default defineComponent({
    name: 'UserMessage',
    components: {
      TextMessage,
      AnswerCard,
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
