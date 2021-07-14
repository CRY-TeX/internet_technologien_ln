import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

import { IApiResponse } from '@/types/api_response_data.interface';
import { IUserMessage } from '@/types/user_message.interface';

export interface State {
  socket: WebSocket | null;
  connected: boolean;
  api_responses: IApiResponse[];
  spin: boolean;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    socket: null,
    connected: false,
    api_responses: [],
    spin: false,
  },

  getters: {
    last_api_response: function(state: State): IApiResponse | undefined {
      return state.api_responses[state.api_responses.length - 1];
    },

    is_socket_open: function(state: State): boolean {
      if (state.socket === null) return false;
      return state.socket.readyState === WebSocket.OPEN;
    },
  },

  mutations: {
    send_msg: (state: State, user_msg: IUserMessage) => {
      if (state.socket === null) throw new Error('No websocket connection');
      state.socket.send(JSON.stringify(user_msg));
    },
    connect_ws: function(state: State) {
      state.socket = new WebSocket('ws://localhost:3000');

      state.socket.onopen = () => {
        state.connected = true;
      };

      state.socket.onclose = () => {
        state.connected = false;
      };
      state.socket.onmessage = ({ data }) => {
        console.log(data);

        try {
          const json_data: IApiResponse = JSON.parse(data);
          state.api_responses.push(json_data);
        } catch (error) {
          console.error(error);
        }
        state.spin = false;
      };
    },
  },
});
