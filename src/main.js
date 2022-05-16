import Vue from 'vue';
import App from './App.vue';
import { message, error } from './data';
import functionAlert from './functionAlert';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
functionAlert(message);
functionAlert(error.notFound);
