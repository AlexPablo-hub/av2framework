import { defineStore } from 'pinia';
import { auth, provider } from '@/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async loginWithGoogle() {
      const result = await signInWithPopup(auth, provider);
      this.user = result.user;
      this.token = await result.user.getIdToken();

      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('token', this.token);
    },

    async logout() {
      await signOut(auth);
      this.user = null;
      this.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/login';
    },

    initAuthListener() {
      const savedUser = localStorage.getItem('user');
      const savedToken = localStorage.getItem('token');

      if (savedUser && savedToken) {
        this.user = JSON.parse(savedUser);
        this.token = savedToken;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      }

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.user = user;
          this.token = await user.getIdToken();
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', this.token);
        } else {
          this.user = null;
          this.token = null;
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      });
    }
  }
});
