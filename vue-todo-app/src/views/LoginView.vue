<template>
  <v-container
    class="d-flex align-center justify-center"
    style="min-height: 100vh; min-width: 100vw; background: linear-gradient(to bottom right, #2196f3, #21cbf3);"
  >
    <v-card
      class="pa-10 text-center"
      width="400"
      elevation="12"
      style="background-color: rgba(255, 255, 255, 0.95); border-radius: 20px;"
    >
      <img src="/checklist.png" alt="Checklist" width="80" class="mb-4" />
      <h2 class="mb-2 font-weight-bold text-primary">Bem-vindo ao TodoApp</h2>
      <p class="mb-6 text-subtitle-1">Gerencie suas tarefas com simplicidade e eficiência.</p>

      <v-btn
        color="primary"
        class="white--text"
        large
        @click="login"
        prepend-icon="mdi-google"
      >
        Entrar com Google
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import api from '@/lib/axios';

const auth = useAuthStore();
const router = useRouter();

async function login() {
  await auth.loginWithGoogle();
  await api.get('/api/users/profile');
  router.push('/');
}
</script>
