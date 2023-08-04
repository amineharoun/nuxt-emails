<template>
  <div class="mail">
    <div class="mail__row">
      <div class="mail__row__check-wrapper">
        <input id="selectAllBtn" v-model="selectAll" @change="doSelectAll" type="checkbox" />
      </div>
      <label for="selectAllBtn">Email Selected ({{ checkedMails.length }})</label>

      <div class="mail__action" v-if="checkedMails.length > 0">
        <button class="action-button" type="button" @click="markAsRead">
          <img src="/icons/action-read.svg" />
          Mark as read (r)
        </button>

        <button class="action-button" type="button" @click="markAsArchive">
          <img src="/icons/action-archive.svg" />
          Archive (a)
        </button>
      </div>
    </div>

    <div class="mail__row mail__item" v-for="p in mails.mails" :key="p.id" :class="{ 'mail__item--unread': !p.read }"
      @click="openModal(p.id)">
      <div @click.stop class="mail__row__check-wrapper">
        <input :value="p.id" v-model="checkedMails" type="checkbox" />
      </div>
      <label>{{ p.title }}</label>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMailsStore } from "/store/MailsStore";

//  fetch the mails
const props = defineProps(["mode"]);

const { data: mails } = await useFetch("/api/" + props.mode);
let checkedMails = ref([]);
const selectAll = ref(false);

const doSelectAll = () => {
  if (selectAll.value) {
    checkedMails.value = mails.value.mails.map((e) => e.id);
  } else {
    checkedMails.value = [];
  }
};
const mailStore = useMailsStore();
if (props.mode == "inbox") {
  mailStore.inboxCount = mails.value.mails.length;
}
if (props.mode == "archive") {
  mailStore.archiveCount = mails.value.mails.length;
}

const markAsRead = () => {
  mails.value.mails.forEach((e) => {
    if (checkedMails.value.includes(e.id)) {
      e.read = true;
    }
  });

  // send post request to api with : checkedMails.value
  // reload mails list
};

const openModal = (id) => {
  let mailIndex = mails.value.mails.findIndex((m) => m.id == id);
  mails.value.mails[mailIndex].read = true;

  mailStore.selectedMail = id;
  mailStore.isModalOpen = true;
};

const markAsArchive = () => {
  // send post request to api with : checkedMails.value
  // reload mails list
};

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (
      e.key == "r" &&
      checkedMails.value.length > 0 &&
      !mailStore.isModalOpen
    ) {
      markAsRead();
    }
    if (
      e.key == "a" &&
      checkedMails.value.length > 0 &&
      !mailStore.isModalOpen
    ) {
      markAsArchive();
    }
  });
});
</script>
<style lang="scss">
.mail {
  overflow-y: scroll;
  flex: 1;

  &__item {
    cursor: pointer;

    &:hover {
      background: #d1e2ff;
    }

    &--unread {
      background: #f3f6fb;
    }
  }

  &__row {
    display: flex;
    height: 60px;
    align-items: center;
    border-bottom: 1px solid #e5e7eb;
    padding: 0 25px 0 15px;

    & label {
      cursor: pointer;
    }

    &__check-wrapper {
      padding: 10px;
      margin: 0 10px 0 0;
    }

    & input[type="checkbox"] {
      -webkit-appearance: none;
      appearance: none;
      background-color: #fff;
      font: inherit;
      width: 20px;
      height: 20px;
      border: 1px solid #cad6e4;
      border-radius: 5px;
      transform: translateY(-0.075em);

      display: grid;
      place-content: center;
    }

    & input[type="checkbox"]::before {
      content: "";
      width: 18px;
      height: 18px;
      background: #fff;
      border-radius: 5px;
    }

    & input[type="checkbox"]:checked {
      background-color: #0968fe;
      border: none;
    }

    & input[type="checkbox"]:checked::before {
      background: url("/icons/checkbox.svg") center center transparent no-repeat;
    }
  }

  &__action {
    margin-left: auto;
    display: flex;
  }
}
</style>
