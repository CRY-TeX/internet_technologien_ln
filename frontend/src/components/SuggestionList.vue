<template>
  <ul class="suggestion-list">
    <li v-for="item in items" :key="item" class="suggestion-item">
      <Suggestion :msg="item" />
    </li>
  </ul>
</template>

<script>
import Suggestion from "./Suggestion.vue";

export default {
  name: "SuggestionList",
  components: {
    Suggestion,
  },

  data() {
    return {
      items: [
        "Ich möchte eine Portion Roastbeef machen.",
        "Ein Ceasar Salad",
        "Schlage mir ein Gericht vor",
      ],
    };
  },
};
</script>

<style scoped>
.suggestion-list {
  max-width: 600px;
  margin: 0 auto 1.5rem auto;
  list-style: none;
}

.suggestion-item {
  margin: 0.5em;
}
</style>
