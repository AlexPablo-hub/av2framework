import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from './store/auth';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

const authStore = useAuthStore();
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
});

app.use(vuetify);
app.use(router);
app.mount('#app');

onAuthStateChanged(auth, async (user) => {
  if (user) {
    authStore.user = user;
    authStore.token = await user.getIdToken();
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', authStore.token);
  } else {
    authStore.user = null;
    authStore.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
});