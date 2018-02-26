import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import Meta from 'vue-meta';
import App from './App.vue'
import "./scss/style.scss"

Vue.use(BootstrapVue);
Vue.use(Meta);

new Vue({
    el: '#app',
    render: h => h(App)
});