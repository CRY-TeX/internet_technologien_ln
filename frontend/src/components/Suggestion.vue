<template>
  <button class="suggestion" @click="send_suggestion()">
    {{ msg }}
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { IUserMessage } from '@/types/user_message.interface';

  export default defineComponent({
    name: 'Suggestion',
    props: {
      msg: {
        type: String,
        required: true,
      },
    },
    methods: {
      send_suggestion: function(): void {
        try {
          const message: IUserMessage = { msg: this.msg };
          this.$store.commit('send_msg', message);
          this.$store.state.spin = true;
        } catch (error) {
          console.error(error);
        }
      },
    },
  });
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
