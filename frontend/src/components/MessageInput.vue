<template>
  <div class="message" :style="{ borderColor: send_confirmed ? '#8ac734' : '#666666' }">
    <input
      type="text"
      name="message"
      placeholder="Fragen Sie mich etwas..."
      v-model="message"
      @keyup.enter="send_msg()"
    />
    <button class="send" @click="send_msg()">
      <img src="../assets/send_icon.png" alt="Senden" />
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { IUserMessage } from '@/types/user_message.interface';

  export default defineComponent({
    name: 'MessageInput',
    data: function() {
      return {
        message: '' as string,
        send_confirmed: false as boolean,
      };
    },
    methods: {
      send_msg: function(): void {
        if (this.message === '') return;

        const message: IUserMessage = { msg: this.message };

        this.$store.commit('send_msg', message);
        this.send_confirmed = true;

        setTimeout(() => {
          this.send_confirmed = false;
        }, 700);
        this.$store.state.spin = true;
      },
    },
  });
</script>

<style scoped>
  .message {
    background: #ffffff;
    border: 1px solid #666666;
    border-radius: 30px;
    padding: 0.45em 0.8em;
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
    margin-bottom: 3rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .message input {
    border: none;
    font-size: 1em;
    color: #888888;
    width: 100%;
  }

  .message input:focus {
    outline: none;
  }

  .send {
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 0.4em;
    /* TODO: ajust color of icon */
    border-radius: 30px;
  }

  .send:hover {
    background: #e4e4e4;
  }

  .send img {
    height: 1.5em;
  }
</style>
