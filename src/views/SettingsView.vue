<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import SettingsHeader from '@/components/SettingsView/SettingsHeader.vue';
import SettingsNav from '@/components/SettingsView/SettingsNav.vue';
import ProfileSection from '@/components/SettingsView/ProfileSection.vue';
import ProfessionalSection from '@/components/SettingsView/ProfessionalSection.vue';
import SettingsActions from '@/components/SettingsView/SettingsActions.vue';
import SettingsSkeleton from '@/components/SettingsView/SettingsSkeleton.vue';

const navItems = [
  'Profile',
  'Account',
  'Appearance',
  'Notifications',
  'Privacy & Security',
  'Billing'
];

const loading = ref(true);

interface UserSettings {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  bio: string;
  jobTitle: string;
  company: string;
  website: string;
  linkedin: string;
}

const initialData = ref<UserSettings | null>(null);
const formData = reactive<UserSettings>({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  username: 'johndoe',
  bio: 'AI enthusiast and lifelong learner. Currently exploring deep learning and natural language processing.',
  jobTitle: 'Software Engineer',
  company: 'Tech Solutions Inc.',
  website: '',
  linkedin: '',
});

onMounted(() => {
  // Simulate loading delay
  setTimeout(() => {
    loading.value = false;
  }, 1500);

  // Store initial data
  initialData.value = JSON.parse(JSON.stringify(formData));
});

const saveChanges = () => {
  console.log('Saving changes:', formData);
  if (initialData.value) {
    initialData.value = JSON.parse(JSON.stringify(formData));
  }
  alert('Changes saved!');
};

const handleLogout = () => {
  console.log('Logging out...');
  alert('Logged out!');
};
</script>

<template>
  <div class="settings-page container">
    <SettingsSkeleton v-if="loading" />

    <template v-else>
      <SettingsHeader />
      <SettingsNav :items="navItems" />

      <div class="settings-grid">
        <ProfileSection :initial-data="formData" />
        <ProfessionalSection :initial-data="formData" />
      </div>

      <SettingsActions
        @save="saveChanges"
        @logout="handleLogout"
      />
    </template>
  </div>
</template>

<style scoped>
.settings-page {
  padding: 2rem 4rem;
  background-color: var(--bg-light);
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-bottom: 3rem;
  align-items: start;
}

@media (max-width: 1024px) {
  .settings-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .settings-page {
    padding: 1rem;
  }
}
</style>
