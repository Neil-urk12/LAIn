<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { useSettingsStore } from '@/stores/settings';

const settingsStore = useSettingsStore();

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

const selectedTab = ref(navItems[0]); // Default to the first item ('Profile')

onMounted(() => {
  settingsStore.initSettings();
});
</script>

<template>
  <div class="settings-page container">
    <SettingsSkeleton v-if="settingsStore.loading" />

    <template v-else-if="!settingsStore.loading">
      <div v-show="!settingsStore.loading">
        <SettingsHeader />
        <SettingsNav :items="navItems" @update:active-tab="selectedTab = $event" />

        <!-- Show/hide sections based on selectedTab -->
        <ProfileSettingsGroup
          v-show="selectedTab === 'Profile'"
          @save="settingsStore.saveSettings"
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
