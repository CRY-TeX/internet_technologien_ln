import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

import { IApiResponse } from '@/types/api_response_data.interface';

declare module '@vue/runtime-core' {
  // store states interface
  interface State {
    socket: WebSocket | null;
    connected: boolean;
    api_responses: IApiResponse[];
    spin: boolean;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
