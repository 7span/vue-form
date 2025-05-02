import defaultOptions from './options'

//Components
import VueForm from './components/form.vue'
import VueFormFields from './components/fields.vue'
import VueFormField from './components/field.vue'
import VueFormUpdate from './components/update.vue'
import VueFormCreate from './components/create.vue'
import VueFormArchive from './components/archive.vue'
import VueFormDelete from './components/delete.vue'
import VueFormUnarchive from './components/unarchive.vue'
import VueFormError from './components/error.vue'

const install = (app, userOptions = {}) => {
  const options = Object.assign({}, defaultOptions, userOptions)
  const prefix = options.componentPrefix

  app.provide('vueForm', options)
  app.component(`${prefix}VueForm`, VueForm)
  app.component(`${prefix}VueFormFields`, VueFormFields)
  app.component(`${prefix}VueFormField`, VueFormField)
  app.component(`${prefix}VueFormUpdate`, VueFormUpdate)
  app.component(`${prefix}VueFormCreate`, VueFormCreate)
  app.component(`${prefix}VueFormArchive`, VueFormArchive)
  app.component(`${prefix}VueFormUnarchive`, VueFormUnarchive)
  app.component(`${prefix}VueFormError`, VueFormError)
  app.component(`${prefix}VueFormDelete`, VueFormDelete)
}

const plugin = {
  install,
}

export default plugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
