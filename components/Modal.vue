<template>
  <div class="modal__wrapper" @click.self="closeModal">
    <div class="modal__content" :class="{ 'modal__content--active': isActive }">
      <div class="modal__content__head">
        <button class="main-btn escapebtn" type="button">
          <img src="/icons/action-escape.svg" />
          Close (Esc)
        </button>

        <div class="modal__content__head__actions">
          <button class="main-btn" type="button" @click="markAsRead">
            <img src="/icons/action-read.svg" />
            Mark as read (r)
          </button>

          <button class="main-btn" type="button" @click="markAsArchive">
            <img src="/icons/action-archive.svg" />
            Archive (a)
          </button>
        </div>
      </div>
      <div class="modal__content__body">
        <h2 class="detailmail__title">
          {{ mail.mail.title }}
        </h2>
        <div class="detailmail__content">{{ mail.mail.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMailsCount } from "/store/MailsCount";
const inboxes = useMailsCount();

const closeModal = () => {
  inboxes.isModalOpen = false;
};
let isActive = ref(false);
setTimeout(() => {
  isActive.value = true;
}, 500);
onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key == "Escape" && inboxes.isModalOpen) {
      closeModal();
    }
    if (e.key == "r" && inboxes.isModalOpen) {
      markAsRead();
    }
    if (e.key == "a" && inboxes.isModalOpen) {
      markAsArchive();
    }
  });
});

const { data: mail } = await useFetch("/api/mail/" + inboxes.selectedMail);

const markAsRead = () => {
  // send post request to api with : inboxes.selectedMail
  // reload mails list
  closeModal();
};

const markAsArchive = () => {
  // send post request to api with : inboxes.selectedMail
  // reload mails list
  closeModal();
};
</script>

<style lang="scss">
@import "/assets/styles/variables";

.modal__wrapper {
  background: rgba($color: #4c5764, $alpha: 0.8);
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 9;
  left: 0;
  top: 0;
}

.modal__content {
  background: #fff;
  height: 100vh;
  border-left: 1px solid #e5e7eb;
  padding: 32px;
  width: 58.75%;
  transition: 0.2s;
  position: absolute;
  right: -100vw;

  &--active {
    right: 0;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;

    &__actions {
      display: flex;
    }

    & .escapebtn {
      margin-left: 0;
    }
  }

  &__body {
    .detailmail__title {
      color: $primaryColor;
      margin-bottom: 20px;
    }

    .detailmail__content {
      color: $secondaryColor;
    }
  }
}
</style>
