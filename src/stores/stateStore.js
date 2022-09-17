import { defineStore } from 'pinia';

export default defineStore('statusStore', {
  state: () => ({
    isLoading: false,
    cartLoadingItem: '',
    messages: [],
  }),
  getters: {},
  actions: {
    pushMessage(data) {
      const { title, content, style = 'success' } = data;
      this.messages.push({ title, content, style });
    },
  },
});
