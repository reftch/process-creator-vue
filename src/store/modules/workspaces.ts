import { ActionContext } from 'vuex';
import { IFolder } from '../../model/folder';
import { WorkspaceState } from '@/model';
import gql from 'graphql-tag'
import apolloClient from "../../api/apolo-ws-client";

const state: WorkspaceState = {
  name: '',
  type: 'LOCAL',
  root: null,
  folder: null,
  projects: [],
}

// getters

const getters =  {
  getRoot(state: WorkspaceState): IFolder | null {
    return state.root;
  }
}

// actions

const actions = {

  async fetch({ commit }: ActionContext<WorkspaceState, void>, path: string): Promise<void> {
    await apolloClient.query({
      query: gql`
          query folder($path: String) {
            folder (path: $path) {name, path, parent, files {name, path, isDirectory}}
          }
        `,
      variables: {
        path: path
      }
    })
    .then(r => {
      if (r) {
        commit('setFolder', r.data.folder);
      }
    });
  },

  async fetchRoot({ commit }: ActionContext<WorkspaceState, void>, path: string): Promise<void> {
    await apolloClient.query({
      query: gql`
          query folder($path: String) {
            folder (path: $path) {name, path, parent, files {name, path, isDirectory}}
          }
        `,
      variables: {
        path: path
      }
    })
    .then(r => {
      if (r) {
        commit('setRoot', r.data.folder);
      }
    });
  },

  async fetchUserHome({ commit }: ActionContext<WorkspaceState, void>): Promise<void> {
    await apolloClient.query({
      query: gql`
          query userHome {
            userHome {path}
          }
        `,
    })
    .then(r => {
      if (r) {
        commit('setUserHome', r.data.userHome);
      }
    });
  }
}

const mutations = {
  setRoot(state: WorkspaceState, root: IFolder): void {
    state.root = root;
  },
  setFolder(state: WorkspaceState, folder: IFolder): void {
    state.folder = folder;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
