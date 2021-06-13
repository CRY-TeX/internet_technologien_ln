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

  data: function() {
    return {
      items: [],
    };
  },

  created: async function() {
    try {
      this.items = await this.get_suggestions();
    } catch (error) {
      console.error(error);
      this.items = [];
    }
  },

  methods: {
    async get_suggestions() {
      try {
        let res = await fetch("http://localhost:3000/api/suggestions");
        let data = await res.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
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
