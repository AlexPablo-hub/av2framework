<template>
  <v-container class="py-10">
    <v-row class="mt-8" justify="center" align="stretch">
      <!-- Card de perfil -->
      <v-col cols="12" md="6">
        <v-card class="pa-6 text-center h-100" elevation="8" rounded="xl">
          <v-avatar v-if="user?.photoURL" size="100" class="mx-auto mb-3">
            <img :src="user.photoURL" alt="User Avatar" />
          </v-avatar>
          <v-avatar v-else size="100" class="mx-auto mb-3">
            <v-icon size="100" color="primary">mdi-account-circle</v-icon>
          </v-avatar>

          <h2 class="font-weight-bold mb-1">Bem-vindo, {{ user?.displayName }}</h2>
          <p class="text-subtitle-1">{{ user?.email }}</p>
        </v-card>
      </v-col>

      <!-- Card de criação de tarefa -->
      <v-col cols="12" md="6">
        <v-card class="pa-4 h-100" elevation="4" rounded="lg">
          <v-form @submit.prevent="createTask">
            <v-text-field v-model="title" label="Título da Tarefa" required outlined />
            <v-select v-model="priority" :items="['low', 'medium', 'high']" label="Prioridade" required outlined />
            <v-btn type="submit" color="primary" block class="mt-4">Criar Tarefa</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>


    <v-row class="mt-6">
      <v-col cols="12" md="6" v-for="task in tasks" :key="task.id">
        <TaskCard :task="task" @toggle="toggleTask" @delete="deleteTask" />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn color="error" class="mt-6" @click="logout">Sair</v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useAuthStore } from '@/store/auth';
import api from '@/lib/axios';
import { useRouter } from 'vue-router';
import TaskCard from '@/components/TaskCard.vue';

const auth = useAuthStore();
const router = useRouter();

const title = ref('');
const priority = ref('medium');
const tasks = ref([]);
const stats = ref({});
const user = computed(() => auth.user);

function logout() {
  auth.logout();
  router.push('/login');
}

async function fetchTasks() {
  const { data } = await api.get('/api/tasks');
  tasks.value = data.data;
}

async function createTask() {
  await api.post('/api/tasks', { title: title.value, priority: priority.value });
  title.value = '';
  fetchTasks();
}

async function toggleTask(id) {
  await api.patch(`/api/tasks/${id}/toggle`);
  fetchTasks();
}

async function deleteTask(id) {
  await api.delete(`/api/tasks/${id}`);
  fetchTasks();
}

onMounted(async () => {
  const { data } = await api.get('/api/users/dashboard');
  stats.value = data.data.statistics;
  fetchTasks();
});
</script>
