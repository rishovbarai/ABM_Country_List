import { createApp } from 'vue';  // Use createApp in Vue 3
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createRouter, createWebHistory } from 'vue-router'; // Vue Router for Vue 3
import CountryList from './components/CountryList.vue';
import CountryDetails from './components/CountryDetails.vue';

const routes = [
  { path: '/', name: 'Home', component: CountryList },
  { name: 'CountryDetails', path: '/country-details/:id', component: CountryDetails, props: true }
];

// Create a router instance
const router = createRouter({
  history: createWebHistory(),  // use createWebHistory for Vue 3
  routes
});

// Create the app instance and mount it to the DOM
const app = createApp(App);
app.use(router);  // Use the router with the app instance
app.mount('#app');
