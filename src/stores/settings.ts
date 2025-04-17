import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';
import { pb } from '@/pocketbase/pocketbase';
import type { UserSettings } from '@/models/interfaces';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    loading: true as boolean,
    initialData: null as UserSettings | null,
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      bio: '',
      jobTitle: '',
      company: '',
      website: '',
      linkedin: '',
    } as UserSettings,
  }),
  getters: {
    hasChanges(state): boolean {
      return JSON.stringify(state.formData) !== JSON.stringify(state.initialData);
    },
  },
  actions: {
    initSettings() {
      this.loading = true;
      const authStore = useAuthStore();
      if (authStore.user) {
        const [first, ...rest] = authStore.user.name.split(' ');
        this.formData.firstName = first;
        this.formData.lastName = rest.join(' ');
        this.formData.email = authStore.user.email;
        this.formData.username = authStore.user.username;
        this.formData.bio = authStore.user.bio || '';
        this.formData.jobTitle = authStore.user.position || '';
        this.formData.company = authStore.user.company || '';
        this.formData.website = authStore.user.website || '';
        this.formData.linkedin = authStore.user.linkedIn || '';
      }
      this.initialData = JSON.parse(JSON.stringify(this.formData));
      this.loading = false;
    },
    async saveSettings() {
      const authStore = useAuthStore();
      if (!authStore.user) throw new Error('Not authenticated');
      try {
        const updated = await pb.collection('users').update(authStore.user.id, {
          name: `${this.formData.firstName} ${this.formData.lastName}`,
          email: this.formData.email,
          username: this.formData.username,
          bio: this.formData.bio,
          position: this.formData.jobTitle,
          company: this.formData.company,
          website: this.formData.website,
          linkedIn: this.formData.linkedin,
        });
        authStore.setUser({
          ...authStore.user,
          name: updated.name,
          email: updated.email,
          username: updated.username,
          bio: updated.bio,
          position: updated.position,
          company: updated.company,
          website: updated.website,
          linkedIn: updated.linkedIn,
        }, authStore.token || '');
        this.initialData = JSON.parse(JSON.stringify(this.formData));
        alert('Changes saved!');
      } catch (e) {
        console.error(e);
        alert('Failed to save changes.');
      }
    },
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
      router.push('/login');
    },
  },
});