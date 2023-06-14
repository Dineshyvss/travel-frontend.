import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import axios from 'axios';

loadFonts();

axios.defaults.baseURL = 'http:http://ec2-3-95-156-213.compute-1.amazonaws.com:8081/:3201'; 
createApp(App).use(router).use(vuetify).mount('#app');
