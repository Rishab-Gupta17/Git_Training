import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
// import axios from 'axios'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret)

createApp(App).use(router).use(store).component('font-awesome-icon',FontAwesomeIcon).mount('#app')

