<template>
  <div class="card" @click.self="show_chat()">
    <img
      class="preview"
      :src="last_response.preview_url"
      alt="Gericht Preview"
      v-if="last_response.preview_url !== ''"
    />

    <button
      class="btn"
      @click="show_meals()"
      v-if="last_response.has_meal_list === true"
    >
      Alle Gerichte
    </button>

    <p class="answer">
      {{ last_response.msg }}
    </p>
  </div>
</template>

<script>
  import router from '../router';

  export default {
    name: 'AnswerCard',
    methods: {
      show_chat() {
        router.push({ name: 'chat' });
      },
      show_meals() {
        router.push({ name: 'meals' });
      },
    },
    computed: {
      last_response: function() {
        return this.$store.state.conversation.length === 0
          ? {
              has_meal_list: false,
              msg: 'Stellen sie mir eine Frage',
              preview_url: '',
            }
          : this.$store.state.conversation[
              this.$store.state.conversation.length - 1
            ].response;
      },
    },
  };
</script>

<style scoped>
  .card {
    background-color: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 1.5em;
    height: 100%;
    overflow-y: auto;
    max-width: 600px;
    min-width: 30%;
  }

  .card:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }

  .preview {
    width: 80%;
    margin: 0 auto 1em auto;
    display: block;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.05));
    border-radius: 10px;
  }

  .btn {
    font-size: 0.8em;
    color: #ffffff;
    background-color: #8ac734;
    padding: 0.32em 0.8em;
    margin: 0 auto 2.5em auto;
    display: block;
    width: 60%;
    border-radius: 30px;
    border: none;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.05));
    cursor: pointer;
  }

  .btn:hover {
    background: #5c9915;
  }

  .answer {
    font-size: 0.9em;
  }
</style>
