import { createStore } from 'vuex';

const store = createStore({
  state: {
    socket: null,
    suggestions: [],
    meals: [],
    conversation: [],
  },
});

export default store;
