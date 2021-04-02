// import { ActionContext } from 'vuex';
// import { IProjectDescription } from 'common';
import { ProjectState } from '@/model';

const state: ProjectState = {
  name: '',
  explorer: { width: 0.3 } ,
  folder: null,
  projectDescription: null
}

// getters

const getters = {
  getProjectName(state: ProjectState) {
    return state.name;
  },
}

// actions

const actions = {

}

const mutations = {
  setProjectName(state: ProjectState, name: string) {
    state.name = name;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
