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

//  fetch the mails
const props = defineProps(["mode"]);

const { data: inboxMails } = await useFetch("/api/inbox");
const { data: archiveMails } = await useFetch("/api/archive");

const inboxes = useMailsStore();
inboxes.updateInboxCount(inboxMails.value.mails.length);
inboxes.updateArchiveCount(archiveMails.value.mails.length);
</script>
