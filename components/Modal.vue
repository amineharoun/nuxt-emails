<template>
  <Transition name="fade">
    <div
      class="modal__wrapper"
      v-show="mailStore.isModalOpen"
      @click.self="closeModal"
    >
      <Transition name="slide-left">
        <div class="modal__content" v-if="mailStore.isModalOpen">
          <div class="modal__content__head">
            <button
              class="action-button escapebtn"
              type="button"
              @click="closeModal"
            >
              <img src="/icons/action-escape.svg" />
              Close (Esc)
            </button>

            <div class="modal__content__head__actions">
              <button class="action-button" type="button" @click="markAsRead">
                <img src="/icons/action-read.svg" />
                Mark as read (r)
              </button>

              <button
                class="action-button"
                type="button"
                @click="markAsArchive"
              >
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
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { useMailsStore } from "/store/MailsStore";
const mailStore = useMailsStore();

const closeModal = () => {
  mailStore.isModalOpen = false;
};

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key == "Escape" && mailStore.isModalOpen) {
      closeModal();
    }
    if (e.key == "r" && mailStore.isModalOpen) {
      markAsRead();
    }
    if (e.key == "a" && mailStore.isModalOpen) {
      markAsArchive();
    }
  });
});

const { data: mail } = await useFetch(`/api/mail/${mailStore.selectedMail}`);

const markAsRead = () => {
  // send post request to api with : mailStore.selectedMail

  closeModal();
};

const markAsArchive = () => {
  // send post request to api with : mailStore.selectedMail

  // reload mails list, we trigger an event using pinia
  mailStore.triggerReloadEvent();

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

  &.fade-enter-active {
    transition: opacity 0.1s ease;
  }

  &.fade-leave-active {
    transition: opacity 0.25s ease;
    transition-delay: 200ms;
  }

  &.fade-enter-from,
  &.fade-leave-to {
    opacity: 0;
  }
}

.modal__content {
  background: #fff;
  height: 100vh;
  border-left: 1px solid #e5e7eb;
  padding: 32px;
  width: 58.75%;
  transition: all 0.2s cubic-bezier(0.1, 0.7, 0.6, 0.9);
  position: absolute;
  right: 0;

  &.slide-left-enter-active {
    transition: all 0.2s ease-out;
    transition-delay: 200ms;
  }

  &.slide-left-leave-active {
    transition: all 0.06s ease-out;
  }

  &.slide-left-enter-from,
  &.slide-left-leave-to {
    transform: translateX(100%);
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
      font-size: 1.7em;
    }

    .detailmail__content {
      color: $secondaryColor;
      font-size: 1.2em;
    }
  }
}
</style>
