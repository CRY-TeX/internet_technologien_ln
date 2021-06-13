<template>
  <div>
    <PageBar page_name="Chat" />

    <div class="msg-container">
      <TextMessage
        class="user-msg"
        :is_user="true"
        msg="Ich möchte ein Mittagessen kochen"
      />
      <BotMessage class="bot-msg" msg="Was schwebt ihnen denn genau vor?" />
      <TextMessage
        class="user-msg"
        :is_user="true"
        msg="Ich möchte ein Mittagessen kochen. Aber bitte ein geiles Roastbeef mit viel Soße und Zwiebeln"
      />
      <BotMessage
        class="bot-msg"
        msg="Kann ich ihnen eine Tomatensuppe vorschlagen?"
        :is_preview="true"
      />
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
  };
</script>

<style scoped>
  .msg-container {
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
