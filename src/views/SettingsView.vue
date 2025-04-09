<script setup lang="ts">
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue';

const SettingsHeader = defineAsyncComponent(() => import('@/components/SettingsView/SettingsHeader.vue'));
const SettingsNav = defineAsyncComponent(() => import('@/components/SettingsView/SettingsNav.vue'));
const SettingsSkeleton = defineAsyncComponent(() => import('@/components/SettingsView/SettingsSkeleton.vue'));
const ProfileSettingsGroup = defineAsyncComponent(() => import('@/components/SettingsView/ProfileSettingsGroup.vue'));
const AccountSettingsSection = defineAsyncComponent(() => import('@/components/SettingsView/AccountSettingsSection.vue'));
const AppearanceSection = defineAsyncComponent(() => import('@/components/SettingsView/AppearanceSection.vue'));
const PrivacySecuritySection = defineAsyncComponent(() => import('@/components/SettingsView/PrivacySecuritySection.vue'));
const BillingSubscriptionSection = defineAsyncComponent(() => import('@/components/SettingsView/BillingSubscriptionSection.vue'));
const NotificationPreferencesSection = defineAsyncComponent(() => import('@/components/SettingsView/NotificationPreferencesSection.vue'));

const navItems = [
  'Profile',
  'Account',
  'Appearance',
  'Notifications',
  'Privacy & Security',
  'Billing'
];

const loading = ref(true);
const selectedTab = ref(navItems[0]); // Default to the first item ('Profile')

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

    <template v-else-if="!loading">
      <div v-show="!loading">
        <SettingsHeader />
        <SettingsNav :items="navItems" @update:active-tab="selectedTab = $event" />

        <!-- Show/hide sections based on selectedTab -->
        <ProfileSettingsGroup
          v-show="selectedTab === 'Profile'"
          :initial-data="formData"
          @save="saveChanges"
          @logout="handleLogout"
        />
        <AccountSettingsSection v-show="selectedTab === 'Account'" />
        <AppearanceSection v-show="selectedTab === 'Appearance'" />
        <PrivacySecuritySection v-show="selectedTab === 'Privacy & Security'" />
        <BillingSubscriptionSection v-show="selectedTab === 'Billing'" />
        <NotificationPreferencesSection v-show="selectedTab === 'Notifications'" />

        <div v-show="!['Profile', 'Account', 'Appearance', 'Privacy & Security', 'Billing', 'Notifications'].includes(selectedTab)" class="placeholder-section">
          <p>Content for {{ selectedTab }} coming soon.</p>
        </div>
      </div>
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
