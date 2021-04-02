import { ActionContext } from 'vuex';
import { IFolder } from '../../model/folder';
import { FolderState } from '@/model';
import gql from 'graphql-tag'
import apolloClient from "../../api/apolo-ws-client";

const state: FolderState = {
  folder: null,
}

// getters

const getters = {
  getFolder(state: FolderState) {
    return state.folder;
  },
}

// actions

const actions = {

  async fetch({ commit }: ActionContext<FolderState, any>, path: string) {
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

}

const mutations = {
  setFolder(state: FolderState, folder: IFolder) {
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
