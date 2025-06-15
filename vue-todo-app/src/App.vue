<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();
auth.initAuthListener();
</script>
