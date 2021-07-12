import { createStore } from 'vuex';

const store = createStore({
  state: {
    socket: null,
    suggestions: [],
    meals: [],
    conversation: [],
    spin: false,
  },
  mutations: {
    spin: (state) => {
      state.spin = true;
      setTimeout(() => {
        state.spin = false;
      }, 3000);
    },
  },
});

export default store;
