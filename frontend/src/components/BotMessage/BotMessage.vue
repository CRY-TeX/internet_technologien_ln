<template>
  <MealCard v-if="msg.preview_url !== ''" :msg="msg" />
  <TextMessage v-else :is_user="false" :msg="msg" />
</template>

<script lang="ts">
  import TextMessage from '../TextMessage.vue';
  import MealCard from './MealCard.vue';

  export default {
    name: 'UserMessage',
    components: {
      TextMessage,
      MealCard,
    },
    props: {
      msg: Object,
    },
  };
</script>

<style scoped>
  /*  */
</style>
