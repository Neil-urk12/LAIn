<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}
.not-found h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.not-found p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
</style>
