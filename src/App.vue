<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="page-wrapper">
    <div class="page">
      <RouterView />
    </div>
    <div class="links">
      <RouterLink to="/">Home</RouterLink> | <RouterLink to="/about">About</RouterLink> |
      <RouterLink to="/game">Game</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}
.page {
  flex: 1;
  margin: 0;
  padding: 0;
  width: 100%;
}
.links {
  margin: 1em;
  width: 100%;
  margin: 1em auto;
  text-align: center;
}
</style>
