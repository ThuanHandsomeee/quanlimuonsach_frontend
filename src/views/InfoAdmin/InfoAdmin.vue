<template>
    <div class="containPage">
      <div class="titlePage">
        <!-- <h2>Profile</h2> -->
      </div>
      <div class="contentPage">
        <section class="h-100 gradient-custom-2">
          <div class="h-100">
            <div
              class="row d-flex justify-content-center align-items-center h-100"
            >
              <div class="col">
                <div class="card">
                  <div class="rounded-top text-white d-flex flex-row bgProfile">
                    <div
                      class="mt-5 d-flex flex-column"
                      style="width: 150px; margin-left: 20px"
                    >
                      <img
                        v-if="data.Avatar"
                        :src="'http://localhost:3000/' + data.Avatar"
                        alt="Generic placeholder image"
                        class="img-fluid img-thumbnail mt-4 mb-2"
                        style="width: 150px; z-index: 1"
                      />
                      <router-link
                        to="/admin/editprofile"
                        style="z-index: 1"
                        class="btn btn-edit"
                      >
                        <button type="button" data-mdb-ripple-color="dark">
                          Chỉnh sửa
                        </button>
                      </router-link>
                    </div>
                    <div class="" style="margin-top: 130px; margin-left: 10px">
                      <h5>{{ data.HoTenNv }}</h5>
                      <p>{{ data.DiaChi }}</p>
                    </div>
                  </div>
                  <div class="p-3 text-black" style="background-color: #f8f9fa">
                    <div class="d-flex justify-content-end text-center py-1">
                      {{ data.ChucVu }}
                    </div>
                  </div>
                  <div class="card-body text-black">
                    <div class="mb-5">
                      <p class="lead fw-normal mb-1">Thông tin cá nhân</p>
                      <div class="" style="background-color: #f8f9fa">
                        <div class="card-body">
                          <div class="row">
                            <div class="col-sm-3">
                              <p class="mb-0">Họ tên</p>
                            </div>
                            <div class="col-sm-9">
                              <p class="text-muted mb-0">{{ data.HoTenNv }}</p>
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <p class="mb-0">Số điện thoại</p>
                            </div>
                            <div class="col-sm-9">
                              <p class="text-muted mb-0">
                                {{ data.SoDienThoai }}
                              </p>
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <p class="mb-0">Địa chỉ</p>
                            </div>
                            <div class="col-sm-9">
                              <p class="text-muted mb-0">{{ data.DiaChi }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import axios from "axios";
  const data = ref({});
  const ID_User = localStorage.getItem("ID_User");
  const fetchData = () => {
    axios
      .get("http://localhost:3000/authentication/info/staff/" + ID_User)
      .then((res) => {
        console.log("Data", res.data);
        data.value = res.data;
      })
      .catch((err) => console.log(err));
  };
  fetchData();
  </script>
  <style lang="scss" scoped>
  @import "./InfoAdmin.scss";
  </style>