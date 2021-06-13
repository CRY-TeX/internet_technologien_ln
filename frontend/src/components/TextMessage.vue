<template>
  <p :class="is_user ? 'msg-user' : 'msg-bot'">{{ msg }}</p>
</template>

<script>
  export default {
    name: 'UserMessage',
    props: {
      msg: String,
      is_user: Boolean,
    },
  };
</script>

<style scoped>
  .msg-user {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.03));
    color: #eaeaea;
    font-size: 0.9em;
    background: #5c9915;
    border-radius: 30px;
    padding: 0.4em 2em 0.4em 1.2em;
    /* width: 90%; */
  }

  .msg-bot {
    color: #eaeaea;
    font-size: 0.9em;
    background: #f5f5f5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
    border-radius: 30px;
    padding: 0.4em 2em 0.4em 1.2em;
    color: #666;
  }
</style>
