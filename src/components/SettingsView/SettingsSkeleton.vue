<template>
  <div class="skeleton-loading">
    <div class="skeleton-header">
      <div class="skeleton-title"></div>
      <div class="skeleton-subtitle"></div>
    </div>

    <div class="skeleton-nav">
      <div class="skeleton-nav-item" v-for="i in 6" :key="i"></div>
    </div>

    <div class="skeleton-grid">
      <div class="skeleton-section" v-for="i in 2" :key="i">
        <div class="skeleton-section-header">
          <div class="skeleton-section-title"></div>
          <div class="skeleton-section-subtitle"></div>
        </div>

        <div class="skeleton-avatar"></div>

        <div class="skeleton-form">
          <div class="skeleton-form-row" v-for="j in 3" :key="j">
            <div class="skeleton-input"></div>
            <div class="skeleton-input"></div>
          </div>
          <div class="skeleton-input"></div>
          <div class="skeleton-textarea"></div>
        </div>
      </div>
    </div>

    <div class="skeleton-actions">
      <div class="skeleton-button"></div>
      <div class="skeleton-button"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-loading {
  padding: 2rem;
}

.skeleton-header {
  margin-bottom: 3rem;
}

.skeleton-title {
  height: 2.25rem;
  width: 8rem;
  background-color: var(--bg-light);
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}

.skeleton-subtitle {
  height: 1.125rem;
  width: 16rem;
  background-color: var(--bg-light);
  border-radius: 0.25rem;
}

.skeleton-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.skeleton-nav-item {
  height: 1.5rem;
  width: 5rem;
  background-color: var(--bg-light);
  border-radius: 0.25rem;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-bottom: 3rem;
}

.skeleton-section {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 2rem;
}

.skeleton-section-header {
  margin-bottom: 2rem;
}

.skeleton-section-title {
  height: 1.5rem;
  width: 10rem;
  background-color: var(--bg-light);
  border-radius: 0.25rem;
  margin-bottom: 0.75rem;
}

.skeleton-section-subtitle {
  height: 0.9375rem;
  width: 14rem;
  background-color: var(--bg-light);
  border-radius: 0.25rem;
}

.skeleton-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--bg-light);
  margin: 0 auto 1rem;
}

.skeleton-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skeleton-form-row {
  display: flex;
  gap: 1.5rem;
}

.skeleton-input {
  flex: 1;
  height: 2.5rem;
  background-color: var(--bg-light);
  border-radius: 0.5rem;
  min-width: 240px;
}

.skeleton-textarea {
  height: 100px;
  background-color: var(--bg-light);
  border-radius: 0.5rem;
}

.skeleton-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.skeleton-button {
  height: 3rem;
  width: 8rem;
  background-color: var(--bg-light);
  border-radius: 0.5rem;
}

@media (max-width: 1024px) {
  .skeleton-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 640px) {
  .skeleton-actions {
    flex-direction: column;
  }

  .skeleton-button {
    width: 100%;
  }

  .skeleton-form-row {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
