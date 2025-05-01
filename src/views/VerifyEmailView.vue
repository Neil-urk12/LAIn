<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { pb } from "../pocketbase/pocketbase";

const route = useRoute();
const router = useRouter();
const status = ref<"loading" | "success" | "error">("loading");
const message = ref("Verifying your email...");

onMounted(async () => {
  const token = route.params.token as string;
  try {
    await pb.collection("users").confirmVerification(token);
    status.value = "success";
    message.value = "Email verified successfully! Redirecting to login...";
    setTimeout(() => {
      router.push({ name: "login" });
    }, 1500);
  } catch (err: unknown) {
    status.value = "error";
    message.value = err instanceof Error ? err.message : "Verification failed.";
  }
});
</script>

<template>
  <div class="verification-page">
    <div v-if="status === 'loading'">
      <p class="loading-text">Verifying your email...</p>
    </div>
    <div v-else-if="status === 'success'">
      <p class="success">
        <span
          v-for="(word, index) in message.split(' ')"
          :key="index"
          class="wave-word"
          :style="{ animationDelay: `${index * 0.08}s` }"
        >
          {{ word }}
        </span>
      </p>
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

.loading-text {
  font-size: 1.2rem;
  animation: loadingDots 0.25s infinite;
}

@keyframes loadingDots {
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.4;
  }
}

.wave-word {
  display: inline-block;
  font-size: 1.3rem;
  position: relative;
  animation: waveAnimation 1.5s cubic-bezier(0.445, 0.05, 0.55, 0.95) forwards;
  margin-right: 0.3rem;
}

@keyframes waveAnimation {
  0% {
    transform: translateY(0);
  }
  5% {
    transform: translateY(-3px);
  }
  10% {
    transform: translateY(-6px);
  }
  15% {
    transform: translateY(-8px);
  }
  20% {
    transform: translateY(-10px);
  }
  25% {
    transform: translateY(-8px);
  }
  30% {
    transform: translateY(-6px);
  }
  35% {
    transform: translateY(-3px);
  }
  40% {
    transform: translateY(0);
  }
  45% {
    transform: translateY(2px);
  }
  50% {
    transform: translateY(4px);
  }
  55% {
    transform: translateY(5px);
  }
  60% {
    transform: translateY(6px);
  }
  65% {
    transform: translateY(5px);
  }
  70% {
    transform: translateY(4px);
  }
  75% {
    transform: translateY(2px);
  }
  80% {
    transform: translateY(0);
  }
  85% {
    transform: translateY(-1px);
  }
  90% {
    transform: translateY(-2px);
  }
  95% {
    transform: translateY(-1px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
