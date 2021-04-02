
import { ActionContext } from 'vuex';
import { ApplicationState, DesktopState } from '@/model';

const state: ApplicationState = {
  desktop: null,
}

const version = '1.0.0';

const defaultDesktop = {
  theme: 'Light',
  workspaces: []
} 

// getters

const getters = {
  getDesktop(state: ApplicationState) {
    return state.desktop;
  },
}

// actions

const actions = {

  async fetch({ commit }: ActionContext<ApplicationState, any>) {
    // localStorage.removeItem(`ppc-${version}`)
    const data: ApplicationState = await JSON.parse(String(localStorage.getItem(`ppc-${version}`)));
    commit('setDesktop', data && data.desktop ? data.desktop : defaultDesktop);
  },

  // setExplorer({ dispatch, commit }: ActionContext<ApplicationState, {}>, explorer: ExplorerState) {
  //   commit('setExplorer', explorer);
  //   dispatch('save');
  // },

  setDesktop({ dispatch, commit }: ActionContext<ApplicationState, any>, desktop: DesktopState) {
    commit('setDesktop', desktop);
    dispatch('save');
  },

  // setWorkspacePath({ dispatch, commit }: ActionContext<ApplicationState, {}>, desktop: DesktopState) {
  //   commit('setDeskto', desktop);
  //   dispatch('save');
  // },

  save({ state }: ActionContext<ApplicationState, any>) {
    localStorage.setItem(`ppc-${version}`, JSON.stringify(state));
  },

}

const mutations = {
  setDesktop(state: ApplicationState, desktop: DesktopState) {
    state.desktop = desktop;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
