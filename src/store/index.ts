import { createStore } from 'vuex';
import settings from './modules/settings';
import workspaces from './modules/workspaces';
import projects from './modules/projects';
import processes from './modules/processes';
import handlers from './modules/handlers';
import folders from './modules/folders';

const store = createStore({
  modules: {
    settings,
    workspaces,
    projects,
    processes,
    folders,
    handlers
  }
})

export default store;