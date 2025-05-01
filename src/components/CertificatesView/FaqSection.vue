<script setup lang="ts">
import { ref } from 'vue';

const faqItems = ref([
  {
    question: 'How do I share my certificate on LinkedIn?',
    answer: 'Click the "Share" button on any certificate, then select "LinkedIn". You\'ll be guided through the process of adding the certificate to your LinkedIn profile.',
    open: false,
  },
  {
    question: 'Are LAIn certificates recognized by employers?',
    answer: 'Yes, LAIn certificates are recognized by many leading technology companies and organizations in the AI field. Our curriculum is designed in collaboration with industry experts to ensure relevance.',
    open: false,
  },
  {
    question: 'Can I download my certificates?',
    answer: 'Yes, you can download any of your earned certificates as a PDF by clicking the "Download" button on the certificate card or detail page.',
    open: false,
  },
  {
    question: 'Do certificates expire?',
    answer: 'Most LAIn certificates do not expire. However, for rapidly evolving fields, we may occasionally update courses and offer new versions of certificates to ensure your skills reflect current knowledge.',
    open: false,
  },
]);

const toggleFaq = (index: number) => {
  faqItems.value[index].open = !faqItems.value[index].open;
};
</script>

<template>
  <div class="faq-section-content">
    <div v-for="(item, index) in faqItems" :key="index" class="faq-item">
      <button class="faq-question" @click="toggleFaq(index)" :aria-expanded="item.open">
        <span>{{ item.question }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="faq-icon" :class="{ 'rotate-icon': item.open }">
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div v-show="item.open" class="faq-answer">
        <p>{{ item.answer }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-item {
  border-bottom: 1px solid var(--border-color);
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: calc(var(--spacing-unit) * 2.5) 0; /* Vertical padding, no horizontal */
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-dark);
}

.faq-question:hover {
  color: var(--primary-color);
}

.faq-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;
  flex-shrink: 0; /* Prevent icon shrinking */
  margin-left: var(--spacing-unit); /* Space between text and icon */
}

.rotate-icon {
  transform: rotate(180deg);
}

.faq-answer {
  padding-bottom: calc(var(--spacing-unit) * 2.5);
  overflow: hidden;
  /* transition: max-height 0.3s ease-out; */ /* Simple transition, can be improved */
}

.faq-answer p {
  color: var(--text-light);
  margin: 0; /* Remove default paragraph margin */
  line-height: 1.6;
}

/* Dark Mode Adjustments */
html.dark .faq-item {
  border-bottom-color: var(--border-color);
}

html.dark .faq-question {
  color: var(--text-dark);
}

html.dark .faq-question:hover {
  color: var(--primary-color);
}

html.dark .faq-answer p {
  color: var(--text-light);
}

</style>
