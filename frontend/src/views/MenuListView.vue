<template>
  <div>
    <PageBar page_name="Alle Gerichte" />
    <ul class="meal-list">
      <li v-for="meal in meal_list" :key="meal.link">
        <MealCard :meal="meal" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import PageBar from '../components/PageBar.vue';
  import MealCard from '../components/MealCard.vue';

  import { IApiResponse } from '@/types/api_response_data.interface';

  export default defineComponent({
    name: 'MenuListView',
    components: {
      PageBar,
      MealCard,
    },
    computed: {
      meal_list: function() {
        const last_api_response: IApiResponse | undefined = this.$store.state.api_responses[
          this.$store.state.api_responses.length - 1
        ];

        return last_api_response?.meal_list === undefined ? [] : last_api_response.meal_list;
      },
    },
  });
</script>

<style scoped>
  .meal-list {
    width: 90%;
    margin: 0 auto;
    list-style: none;
  }

  .meal-list li {
    margin: 0.6rem 0;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 650px) {
    .meal-list {
      transform: translateY(-2.5em);
    }
  }
</style>
