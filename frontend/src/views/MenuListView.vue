<template>
  <div>
    <PageBar page_name="Alle Gerichte" />
    <ul class="meal-list">
      <li v-for="meal in meals" :key="meal.link"><MealCard :meal="meal" /></li>
    </ul>
  </div>
</template>

<script>
import PageBar from "../components/PageBar.vue";
import MealCard from "../components/MealCard.vue";

export default {
  name: "MenuListView",
  components: {
    PageBar,
    MealCard,
  },
  data: function() {
    return {
      meals: [],
    };
  },
  created: async function() {
    try {
      let res = await fetch("http://localhost:3000/api/meals");
      let data = await res.json();
      this.meals = data;
      console.log(this.meals);
    } catch (error) {
      console.error(error);
      this.meals = [];
    }
  },
};
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
