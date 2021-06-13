<template>
  <PageBar page_name="Alle Gerichte" />
  <ul class="meal-list">
    <li v-for="index in 10" :key="index"><MealCard /></li>
  </ul>
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
