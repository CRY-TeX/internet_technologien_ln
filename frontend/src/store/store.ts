import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

import { IApiResponse } from '@/types/api_response_data.interface';
import { IUserMessage } from '@/types/user_message.interface';

export interface State {
  socket: WebSocket | null;
  api_responses: IApiResponse[];
  spin: boolean;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    socket: null,
    api_responses: [],
    spin: false,
  },

  getters: {
    last_api_response: function(state: State): IApiResponse | undefined {
      return state.api_responses[state.api_responses.length - 1];
    },
  },

  mutations: {
    spin: (state: State) => {
      state.spin = true;
      setTimeout(() => {
        state.spin = false;
      }, 3000);
    },

    send_msg: (state: State, user_msg: IUserMessage) => {
      if (state.socket === null) throw new Error('No websocket connection');
      state.socket.send(JSON.stringify(user_msg));
    },
  },
});
