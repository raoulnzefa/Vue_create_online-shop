import Vue from 'vue';
import App from './App.vue';
import data from './data';
import alertMessage from './alert';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
alertMessage(data.message_1);
alertMessage(data.message_2);
