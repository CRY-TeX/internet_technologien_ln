<template>
  <MealCard v-if="is_preview" :msg="msg" />
  <TextMessage v-else :is_user="false" :msg="msg" />
</template>

<script>
  import TextMessage from '../TextMessage.vue';
  import MealCard from './MealCard.vue';

  export default {
    name: 'UserMessage',
    components: {
      TextMessage,
      MealCard,
    },
    props: {
      msg: String,
      is_preview: Boolean,
    },
  };
</script>

<style scoped>
  /*  */
</style>
