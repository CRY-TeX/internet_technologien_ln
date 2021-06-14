<template>
  <div class="container">
    <PageBar page_name="Chat" />

    <div class="msg-box" v-for="item in get_conversation" :key="item.index">
      <TextMessage class="user-msg" :is_user="true" :msg="item.msg" />
      <BotMessage class="bot-msg" :msg="item.response" />
    </div>
  </div>
</template>

<script>
  import PageBar from '../components/PageBar.vue';
  import TextMessage from '../components/TextMessage.vue';
  import BotMessage from '../components/BotMessage/BotMessage.vue';

  export default {
    name: 'EntireChat',
    components: {
      PageBar,
      TextMessage,
      BotMessage,
    },
    computed: {
      get_conversation: function() {
        return this.$store.state.conversation;
      },
    },
  };
</script>

<style scoped>
  .container {
    margin-bottom: 5rem;
  }

  .msg-box {
    width: 90%;
    margin: 2.5rem auto 0 auto;
    list-style: none;
    display: grid;
    gap: 2em;
    max-width: 850px;
  }

  .user-msg {
    justify-self: end;
  }

  .bot-msg {
    justify-self: start;
  }
</style>
