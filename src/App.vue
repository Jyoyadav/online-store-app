<template>
  <div id="app">
    <Header />
    <main>
      <RouterView />
    </main>
    <ToastNotification />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import ToastNotification from './components/ToastNotification.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
}
</style>
