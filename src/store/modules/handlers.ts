import { Handler } from '@/model';

interface HandlerState {
  handler: Handler | null;

}


const state: HandlerState = {
  handler: null,
}

// getters

const getters = {
  getHandler(state: HandlerState) {
    return state.handler;
  },
}

// actions

const actions = {

}

const mutations = {
  setHandler(state: HandlerState, handler: Handler) {
    state.handler = handler;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
