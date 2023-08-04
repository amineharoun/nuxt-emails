<script lang="ts" setup></script>

<template>
  <Body>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>

<script setup>
import { ref } from "vue";
import { useMailsStore } from "/store/MailsStore";

//  fetch the mails to get display count in sidebar
const { data: inboxMails } = await useFetch("/api/inbox");
const { data: archiveMails } = await useFetch("/api/archive");

const mailStore = useMailsStore();
mailStore.inboxCount = inboxMails.value.mails.length;
mailStore.archiveCount = archiveMails.value.mails.length;
</script>
