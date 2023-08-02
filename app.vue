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
import { useMailsCount } from "/store/MailsCount";

//  fetch the mails
const props = defineProps(["mode"]);

const { data: inboxMails } = await useFetch("/api/inbox");
const { data: archiveMails } = await useFetch("/api/archive");

const inboxes = useMailsCount();
inboxes.updateInboxCount(inboxMails.value.mails.length);
inboxes.updateArchiveCount(archiveMails.value.mails.length);
</script>
