<template>
    <div class="app">
      <SideBar />
      <div class="d-block w-100">
        <AppHeader />
        <div class="scrollable"><router-view /></div>
      </div>
    </div>
</template>

<script setup>
  import SideBar from "../../components/SideBar/SideBar.vue";
  import AppHeader from "../../components/AppHeader/AppHeader.vue";
</script>

<style scoped>
  .scrollable {
    overflow-y: auto;
    max-height: calc(100vh - 72px);
  }
</style>