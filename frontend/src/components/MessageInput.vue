<template>
  <div class="message">
    <input
      type="text"
      name="message"
      id="message"
      placeholder="Fragen Sie mich etwas..."
    />
    <button class="send">
      <img src="../assets/send_icon.png" alt="Senden" />
    </button>
  </div>
</template>

<script>
export default {
  name: "MessageInput",
};
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
