<template>
  <v-container
    class="fill-height d-flex align-center justify-center"
    style="min-height: 100vh; min-width: 100vw; background: linear-gradient(to bottom right, #f44336, #ff9800);"
  >
    <v-card
      class="pa-10 text-center"
      width="480"
      elevation="12"
      style="background-color: rgba(255, 255, 255, 0.95); border-radius: 16px;"
    >
      <v-icon
        size="80"
        color="error"
        class="mb-4"
        style="animation: pulse 1.2s infinite alternate;"
      >
        mdi-alert-circle-outline
      </v-icon>

      <h2 class="text-h5 font-weight-bold mb-2 text-error">404 - Página não encontrada</h2>
      <p class="text-body-1 mb-6">Oops! A URL que você tentou acessar não existe ou foi movida.</p>

      <v-btn color="red" @click="$router.push('/')">
        Voltar para o início
      </v-btn>
    </v-card>
  </v-container>
</template>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.1);
    opacity: 1;
  }
}
</style>
