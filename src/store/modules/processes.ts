import { ActionContext } from 'vuex';
import { IProcessConfiguration  } from '../../model/process';
import { ProcessState  } from '@/model';
import gql from 'graphql-tag'
import apolloClient from "../../api/apolo-ws-client";

const state: ProcessState = {
  processConfiguration: null
}

// getters

const getters = {
  getProcess(state: ProcessState) {
    return state.processConfiguration;
  },
}

// actions

const actions = {

  async fetch({ commit }: ActionContext<ProcessState, any>, path: string) {
    await apolloClient.query({
      query: gql`
          query process($path: String) {
            process (path: $path) {
              ProcessConfiguration {
                GeneralSettings {
                  SystemSettings {
                    Deployment_URI
                    ProgDir
                    DataDir
                    attributes {
                      SystemName
                    }
                  }
                }
              }
            }
          }
        `,
      variables: {
        path: path
      }
    })
    .then(r => {
      if (r) {
        if (r.data) {
          commit('setProcessConfiguration', r.data.process);
        }
      }
    });
  }

}

const mutations = {
  setProcessConfiguration(state: ProcessState, processConfiguration: IProcessConfiguration) {
    state.processConfiguration = processConfiguration;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
