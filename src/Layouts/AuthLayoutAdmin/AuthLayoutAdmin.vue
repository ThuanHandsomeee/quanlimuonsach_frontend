<template>
    <div class="app">
      <div class="d-block w-100">
        <AuthHeaderAdmin />
        <router-view />
      </div>
    </div>
  </template>
  <script setup>
  import AuthHeaderAdmin from "../../components/AuthHeaderAdmin/AuthHeaderAdmin.vue";
</script>