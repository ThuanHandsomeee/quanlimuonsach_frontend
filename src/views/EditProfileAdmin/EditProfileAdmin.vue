<template>
    <div class="containPage">
      <div class="titlePage">
        <h2>Chỉnh sửa thông tin</h2>
      </div>
      <div class="contentPage">
        <section>
          <div class="container">
            <div class="row">
              <div class="col-lg-4">
                <div class="card mb-4">
                  <div class="card-body text-center">
                    <img
                      :src="imageUploadEdit"
                      alt="avatar"
                      class="rounded-circle img-fluid"
                      style="width: 150px"
                    />
                    <h5 class="my-3">{{ data.HoTenNv }}</h5>
                    <!-- <p class="text-muted mb-1">Khách hàng</p> -->
                    <p class="text-muted mb-4">{{ data.DiaChi }}</p>
                    <div class="d-flex justify-content-center mb-2">
                      <label for="image" class="btn btn-primary"
                        ><i class="fa-solid fa-image"></i> Change</label
                      >
                      <input
                        type="file"
                        style="display: none"
                        name="image"
                        id="image"
                        @change="handleImageUpdate"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-8">
                <div class="card mb-4">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="lableGroup">Họ tên</p>
                      </div>
                      <div class="col-sm-9">
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control inputGroup"
                            v-model="name"
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="lableGroup">Phone</p>
                      </div>
                      <div class="col-sm-9">
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control inputGroup"
                            v-model="phone"
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="lableGroup">Chức vụ</p>
                      </div>
                      <div class="col-sm-9">
                        <div class="input-group">
                          <select
                            v-model="chucvu"
                            class="selectedChucvu"
                            name=""
                            id=""
                          >
                            <option value="">Chọn chức vụ</option>
                            <option value="Quản lý">Quản lý</option>
                            <option value="Nhân viên">Nhân viên</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <p class="lableGroup">Địa chỉ</p>
                      </div>
                      <div class="col-sm-9">
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control inputGroup"
                            v-model="address"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-end">
                  <router-link to="/admin/info">
                    <button class="btn btn-secondary m-2">Thoát</button>
                  </router-link>
  
                  <button class="btn btn-primary m-2" @click="handleSave">
                    Cập nhật
                  </button>
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
  import { toast } from "vue3-toastify";
  const data = ref({});
  const name = ref("");
  const password = ref("");
  const phone = ref("");
  const address = ref("");
  const chucvu = ref("");
  const imageUpload = ref(null);
  const imageUploadEdit = ref();
  const ID_User = localStorage.getItem("ID_User");
  const fetchData = () => {
    axios
      .get("http://localhost:3000/authentication/info/staff/" + ID_User)
      .then((res) => {
        console.log("Data", res.data);
        data.value = res.data;
        name.value = res.data.HoTenNv;
        password.value = res.data.Password;
        phone.value = res.data.SoDienThoai;
        chucvu.value = res.data.ChucVu;
        address.value = res.data.DiaChi;
        imageUploadEdit.value = `http://localhost:3000/${res.data.Avatar}`;
      })
      .catch((err) => console.log(err));
  };
  fetchData();
  const handleImageUpdate = (e) => {
    if (e.target.files && e.target.files[0]) {
      imageUploadEdit.value = URL.createObjectURL(e.target.files[0]);
      imageUpload.value = e.target.files[0];
    }
  };
  const handleSave = () => {
    console.log("ID_ADMIN", ID_User);
    const formData = new FormData();
    formData.append("avatar", imageUpload.value);
    formData.append("username", name.value);
    formData.append("phone", phone.value);
    formData.append("position", chucvu.value);
    formData.append("address", address.value);
    axios
      .put("http://localhost:3000/authentication/edit/staff/" + ID_User, formData)
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else if (res.data.message) {
          toast.success(res.data.message);
          fetchData();
        }
      })
      .catch((err) => console.log(err));
  };
  </script>
  <style lang="scss" scoped>
  @import "./EditProfileAdmin.scss";
  </style>