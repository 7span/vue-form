import defaultOptions from './options'

//Components
import VueForm from './components/form.vue'

const install = (app, userOptions = {}) => {
  const options = Object.assign({}, defaultOptions, userOptions)
  const prefix = options.componentPrefix

  app.provide('vueForm', options)
  app.component(`${prefix}VueList`, VueForm)
}

const plugin = {
  install,
}

export default plugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
