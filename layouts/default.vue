<template>
  <div class="main">
    <SideBar />
    <div class="page">
      <slot />
    </div>
  </div>
  <Modal v-if="inboxes.isModalOpen" />
</template>

<script setup>
import { useMailsCount } from "/store/MailsCount";
const inboxes = useMailsCount();
</script>

<style lang="scss">
@import "/assets/styles/variables";

html {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.main {
  display: flex;
  height: 100vh;
}

.page {
  color: $primaryColor;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
