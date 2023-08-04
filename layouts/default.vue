<template>
  <div class="main">
    <SideBar />
    <div class="page">
      <slot />
    </div>
  </div>
  <Modal />
</template>

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
