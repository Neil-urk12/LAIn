<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { pb } from '../pocketbase/pocketbase';

const route = useRoute();
const router = useRouter();
const status = ref<'loading' | 'success' | 'error'>('loading');
const message = ref('Verifying your email...');

onMounted(async () => {
  const token = route.params.token as string;
  try {
    await pb.collection('users').confirmVerification(token);
    status.value = 'success';
    message.value = 'Email verified! Redirecting to login...';
    router.push({ name: 'login' });
    // setTimeout(() => {
    //   router.push({ name: 'login' });
    // }, 3000);
  } catch (err: unknown) {
    status.value = 'error';
    message.value = err instanceof Error ? err.message : 'Verification failed.';
  }
});
</script>

<template>
  <div class="verification-page">
    <div v-if="status === 'loading'">
      <p>Verifying your email...</p>
    </div>
    <div v-else-if="status === 'success'">
      <p class="success">{{ message }}</p>
    </div>
    <div v-else>
      <p class="error">{{ message }}</p>
      <router-link to="/login" class="login-link">Go to Login</router-link>
    </div>
  </div>
</template>

<style scoped>
.verification-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  padding: 1rem;
}

.success {
  color: #2e7d32;
  font-weight: bold;
}

.error {
  color: #c62828;
  font-weight: bold;
}

.login-link {
  margin-top: 1rem;
  color: #1976d2;
  text-decoration: underline;
}
</style>
