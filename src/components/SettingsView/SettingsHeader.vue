<template>
  <div class="settings-header">
    <h1>Settings</h1>
    <p>Manage your account settings and preferences</p>
  </div>
</template>

<style scoped>
.settings-header h1 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
  letter-spacing: -0.025em;
}

.settings-header p {
  font-size: 1.125rem;
  color: var(--text-light);
  margin-bottom: 3rem;
}

@media (max-width: 768px) {
  .settings-header h1 {
    font-size: 1.75rem;
  }
}
</style>
