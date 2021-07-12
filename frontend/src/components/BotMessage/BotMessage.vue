<template>
  <MealCard v-if="msg.preview_url !== ''" :msg="msg" />
  <TextMessage v-else :is_user="false" :msg="msg" />
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import TextMessage from '../TextMessage.vue';
  import MealCard from './MealCard.vue';

  import { IAnswerMessage } from '@/types/api_response_data.interface';

  export default defineComponent({
    name: 'UserMessage',
    components: {
      TextMessage,
      MealCard,
    },
    props: {
      msg: {
        type: Object as PropType<IAnswerMessage>,
        required: true,
      },
    },
  });
</script>

<style scoped>
  /*  */
</style>
