import OmSingleUpload from './components/upload/index.js'

const install = function(Vue, opts = {}) {
  Vue.component(OmSingleUpload.name, OmSingleUpload)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = {
  install,
  OmSingleUpload
}
