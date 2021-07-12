<template>
  <ul class="suggestion-list">
    <li v-for="suggestion in suggestions" :key="suggestion" class="suggestion-item">
      <Suggestion :msg="suggestion" />
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import Suggestion from './Suggestion.vue';

  export default defineComponent({
    name: 'SuggestionList',
    components: {
      Suggestion,
    },
    computed: {
      suggestions: function() {
        const store_suggestions: string[] | undefined = this.$store.getters.last_api_response?.suggestions;

        return store_suggestions === undefined ? [] : store_suggestions;
      },
    },
  });
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
