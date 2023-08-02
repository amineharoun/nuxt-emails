import { defineStore } from "pinia";

export const useMailsCount = defineStore("mailsCount", {
  state: () => ({
    inbox: 0,
    archive: 0,
    selectedMail: null,
    isModalOpen: false,
  }),
  actions: {
    updateInboxCount(nb) {
      this.inbox = nb;
    },
    updateArchiveCount(nb) {
      this.archive = nb;
    },
  },
});
