<template>
  <ul class="suggestion-list">
    <li
      v-for="suggestion in suggestions"
      :key="suggestion.link"
      class="suggestion-item"
    >
      <Suggestion :msg="suggestion" />
    </li>
  </ul>
</template>

<script>
  import Suggestion from './Suggestion.vue';

  export default {
    name: 'SuggestionList',
    components: {
      Suggestion,
    },
    computed: {
      suggestions: function() {
        return this.$store.state.suggestions;
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
