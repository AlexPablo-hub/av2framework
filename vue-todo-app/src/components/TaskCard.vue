<template>
  <v-card class="mb-4" :elevation="4" :color="cardColor" dark rounded="lg">
    <v-card-title class="d-flex justify-space-between align-center">
      <div>{{ task.title }}</div>
      <v-chip
        :color="task.completed ? 'green' : 'black'"
        text-color="black"
        small
        class="ml-2"
      >
        {{ task.completed ? 'Concluída' : 'Pendente' }}
      </v-chip>
    </v-card-title>

    <v-card-subtitle class="pl-4 text-caption">
      Prioridade: {{ task.priority }}
    </v-card-subtitle>

    <v-card-actions class="justify-end">
      <v-btn icon @click="$emit('toggle', task.id)" :title="'Alternar status'">
        <v-icon color="white">mdi-check-circle-outline</v-icon>
      </v-btn>
      <v-btn icon @click="$emit('delete', task.id)" :title="'Excluir tarefa'">
        <v-icon color="white">mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  task: Object
});

const cardColor = computed(() => {
  switch (props.task.priority) {
    case 'high':
      return 'red';
    case 'medium':
      return 'orange darken-3';
    default:
      return 'blue darken-3';
  }
});
</script>
