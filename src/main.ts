import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import creatorWidgets from './components'
import resizeDetector from './directives/resizeDetector'

const instance = createApp(App);

instance
  .directive('resize', resizeDetector)
  .use(store)
  .use(router)
  .use(creatorWidgets)
  .mount('#app')

  