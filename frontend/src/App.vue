<template>
  <router-view />
</template>

<script>
  export default {
    name: 'App',

    created: function() {
      this.$store.state.socket = new WebSocket('ws://localhost:3000');

      this.$store.state.socket.onopen = (event) => {
        console.log('WebSocket successfully connected');
        console.log(event);
        this.$store.state.socket.send(
          JSON.stringify({
            msg: 'initial',
          })
        );
      };

      // TODO: define on close event

      this.$store.state.socket.onmessage = ({ data }) => {
        console.log(data);

        try {
          let json_data = JSON.parse(data);
          this.$store.state.suggestions = json_data.suggestions;
          this.$store.state.meals = json_data.meals;
          this.$store.state.conversation.push({
            index: this.$store.state.conversation.length,
            msg: { msg: json_data.msg },
            response: json_data.response,
          });
        } catch (error) {
          console.error(error);
        }
      };
    },
  };
</script>

<style>
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Poppins', sans-serif;
    color: #666666;
  }
</style>
