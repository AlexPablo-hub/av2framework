<template>
  <v-container class="text-center py-10">
    <h2 class="mb-6">Crie sua conta</h2>
    <v-btn color="primary" @click="registerGoogle">Cadastrar com Google</v-btn>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import api from '@/lib/axios';

const auth = useAuthStore();
const router = useRouter();

async function registerGoogle() {
  await auth.loginWithGoogle();
  await api.get('/api/users/profile');
  router.push('/');
}
</script>
