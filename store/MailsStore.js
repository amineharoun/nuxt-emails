import { defineStore } from "pinia";

export const useMailsStore = defineStore("mailsStore", {
  state: () => ({
    inboxCount: 0,
    archiveCount: 0,
    selectedMail: null,
    isModalOpen: false
  })
});
