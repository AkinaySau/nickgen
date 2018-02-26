import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import Meta from 'vue-meta';
import App from './App.vue'
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap-vue/dist/bootstrap-vue.css"
// import "bootstrap/scss/bootstrap.scss"
// import "bootstrap-vue/src/"
import "./scss/style.scss"

Vue.use(BootstrapVue);
Vue.use(Meta);

new Vue({
    el: '#app',
    render: h => h(App)
});