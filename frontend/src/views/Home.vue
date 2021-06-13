<template>
  <Titlebar />
  <Spinner />
  <h2 class="user-question">Ich möchte ein Mittagessen kochen</h2>
  <div class="answer-container">
    <AnswerCard />
  </div>
  <SuggestionList />
  <MessageInput />
</template>

<script>
import Titlebar from "../components/Titlebar.vue";
import Spinner from "../components/Spinner.vue";
import AnswerCard from "../components/AnswerCard.vue";
import MessageInput from "../components/MessageInput.vue";
import SuggestionList from "../components/SuggestionList.vue";

export default {
  name: "Home",
  components: {
    Titlebar,
    Spinner,
    AnswerCard,
    MessageInput,
    SuggestionList,
  },
};
</script>

<style scoped>
.user-question {
  font-size: 1em;
  text-align: center;
  margin-bottom: 2rem;
}

.answer-container {
  min-height: 50vh;
  background-image: url("../assets/dark_oak.png");
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.05));
  border-radius: 0px 0px 15px 15px;
  padding: 1.8em;
  margin-bottom: 2rem;
  /* opacity: 0.75; */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
