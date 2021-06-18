<template>
  <button class="suggestion" @click="send_suggestion()">
    {{ msg }}
  </button>
</template>

<script>
  export default {
    name: 'Suggestion',
    props: {
      msg: {
        type: String,
        default: '#EMPTY#',
      },
    },
    methods: {
      send_suggestion: function() {
        this.$store.state.socket.send(
          JSON.stringify({
            msg: this.msg,
          })
        );
        this.$store.commit('spin');
      },
    },
  };
</script>

<style scoped>
  /*  */
  .suggestion {
    font-family: 'Poppins', sans-serif;
    font-size: 0.9em;
    background-color: #c4c4c4;
    border-radius: 30px;
    border: none;
    color: #ffffff;
    padding: 0.3em 1.2em;
    cursor: pointer;
  }

  .suggestion:hover {
    background-color: #707070;
  }
</style>
