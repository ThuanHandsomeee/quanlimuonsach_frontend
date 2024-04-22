<template>
  <div class="containPage">
    <div class="titlePage">
      <h2>Profile</h2>
    </div>
    <div class="contentPage">
      <section class="profile-section">
        <div class="profile-card">
          <div class="profile-header">
            <div class="profile-avatar">
              <img v-if="data.Avatar" :src="'http://localhost:3000/' + data.Avatar" alt="Avatar"
                class="img-fluid img-thumbnail" />
              <router-link to="/editprofile" class="edit-profile-btn">
                <button type="button" class="btn btn-primary mt-1">
                  Chỉnh sửa
                </button>
              </router-link>
            </div>
            <div class="profile-info">
              <h5>{{ data.Ten }}</h5>
              <p>{{ data.DiaChi }}</p>
            </div>
          </div>
          <div class="profile-body">
            <p class="lead fw-normal mb-3">Thông tin cá nhân</p>
            <div class="personal-info">
              <div class="info-item">
                <p class="info-label">Họ tên:</p>
                <p class="info-content">{{ data.Ten }}</p>
              </div>
              <div class="info-item">
                <p class="info-label">Số điện thoại:</p>
                <p class="info-content">{{ data.DienThoai }}</p>
              </div>
              <div class="info-item">
                <p class="info-label">Địa chỉ:</p>
                <p class="info-content">{{ data.DiaChi }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const data = ref({});
const ID_DG = localStorage.getItem("ID_DG");

const fetchData = () => {
  axios
    .get("http://localhost:3000/authentication/info/" + ID_DG)
    .then((res) => {
      data.value = res.data;
    })
    .catch((err) => console.log(err));
};
fetchData();
</script>

<style lang="scss" scoped>
@import "./Profile.scss";
</style>
