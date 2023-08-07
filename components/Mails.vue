<template>
  <div class="mail">
    <div class="mail__row">
      <div class="mail__row__check-wrapper">
        <input
          id="selectAllBtn"
          v-model="selectAll"
          @change="doSelectAll"
          type="checkbox"
        />
      </div>
      <label for="selectAllBtn"
        >Email Selected ({{ checkedMails.length }})</label
      >

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

    <div
      class="mail__row mail__item"
      v-for="p in mails"
      :key="p.id"
      :class="{ 'mail__item--unread': !p.read }"
      @click="openModal(p.id)"
    >
      <div @click.stop class="mail__row__check-wrapper">
        <input :value="p.id" v-model="checkedMails" type="checkbox" />
      </div>
      <label>{{ p.title }}</label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useMailsStore } from "/store/MailsStore";

const props = defineProps(["mode"]);
const mailStore = useMailsStore();

const loadMails = async () => {
  const { data: mails } = await useFetch(`/api/${props.mode}`, {
    transform: (_mails) => _mails.mails,
  });

  //update counts to be viewed in sidebar when page reloading
  if (props.mode == "inbox") {
    mailStore.inboxCount = mails.value.length;
  }
  if (props.mode == "archive") {
    mailStore.archiveCount = mails.value.length;
  }
  return mails;
};

let mails = ref(await loadMails());

let checkedMails = ref([]);
const selectAll = ref(false);
const doSelectAll = () => {
  if (selectAll.value) {
    checkedMails.value = mails.value.map((e) => e.id);
  } else {
    checkedMails.value = [];
  }
};

const markAsRead = () => {
  mails.value.forEach((e) => {
    if (checkedMails.value.includes(e.id)) {
      e.read = true;
    }
  });

  // send post request to api with : checkedMails.value
};

const openModal = (id) => {
  let mailIndex = mails.value.findIndex((m) => m.id == id);
  mails.value[mailIndex].read = true;

  mailStore.selectedMail = id;
  mailStore.isModalOpen = true;
};

const markAsArchive = () => {
  mails.value = mails.value.filter((m) => !checkedMails.value.includes(m.id));

  // send post request to api with : checkedMails.value

  // reload mails list to get a new list of mails, I simulate loading with a delay of 1 second
  setTimeout(async () => {
    checkedMails.value = [];
    mails = await loadMails();
  }, 1000);
};

// Watch for the reloadEventTriggered state
watch(
  () => mailStore.reloadEventTriggered,
  (reloadEventTriggered) => {
    if (reloadEventTriggered) {
      //reload mails...
      setTimeout(async () => {
        mails = await loadMails();
      }, 800);

      // Reset the state after executing the function
      mailStore.resetReloadEvent();
    }
  }
);

const handleKeyDown = (e) => {
  if (
    e.key === "r" &&
    checkedMails.value.length > 0 &&
    !mailStore.isModalOpen
  ) {
    markAsRead();
  }
  if (
    e.key === "a" &&
    checkedMails.value.length > 0 &&
    !mailStore.isModalOpen &&
    props.mode !== "archive"
  ) {
    markAsArchive();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
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
      cursor: pointer;
      display: grid;
      place-content: center;
    }

    & input[type="checkbox"]:hover {
      border: 1px solid #aabacc;
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
