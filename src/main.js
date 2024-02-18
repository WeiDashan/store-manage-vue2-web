import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import uploadone from '@/components/upload/uploadone'
import uploadmore from '@/components/upload/uploadmore'
import wdsEditor from '@/components/editor'
Vue.config.productionTip = false
Vue.prototype.img = (path) => {
	return 'http://49.233.51.52:9000/images/' + path
}
// Vue.prototype.$img = (path) => {
//     return 'http://49.233.51.52:9000/images/' + path
// }
Vue.component('uploadone',uploadone)
Vue.component('uploadmore',uploadmore)
Vue.component('WdsEditor',wdsEditor)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// export default Vue