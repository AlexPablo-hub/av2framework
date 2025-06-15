<template>
  <v-container>
    <v-form @submit.prevent="createTask">
      <v-text-field v-model="title" label="Título" required />
      <v-select v-model="priority" :items="['low', 'medium', 'high']" label="Prioridade" required />
      <v-btn type="submit">Criar Tarefa</v-btn>
    </v-form>

    <v-divider class="my-4" />

    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="toggleTask"
      @delete="deleteTask"
    />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/lib/axios';
import TaskCard from '@/components/TaskCard.vue';

const title = ref('');
const priority = ref('medium');
const tasks = ref([]);

async function fetchTasks() {
  const { data } = await api.get('/api/tasks');
  tasks.value = data.data;
}

async function createTask() {
  await api.post('/api/tasks', {
    title: title.value,
    priority: priority.value,
  });
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

onMounted(() => {
  fetchTasks();
});
</script>