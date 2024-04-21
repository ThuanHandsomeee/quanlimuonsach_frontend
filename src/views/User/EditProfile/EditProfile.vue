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
                        v-if="data.Avatar != null"
                        :src="'http://localhost:3000/' + data.Avatar"
                        alt="Generic placeholder image"
                        class="img-fluid img-thumbnail mt-4 mb-2"
                        style="width: 150px; z-index: 1"
                      />
                    <h5 class="my-3">{{ data.Ten }}</h5>
                    <p class="text-muted mb-1">Đọc giả</p>
                    <p class="text-muted mb-4">{{ data.NgaySinh }}</p>
                    <div class="d-flex justify-content-center mb-2">
                      <label for="image" class="btn btn-primary"
                        ><i class="fa-solid fa-image"></i> Thay đổi</label
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
                        <p class="lableGroup">Ngày sinh</p>
                      </div>
                      <div class="col-sm-9">
                        <div class="input-group">
                          <input
                            type="date"
                            class="form-control inputGroup"
                            v-model="birth"
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
                  <router-link to="/profile">
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
  const birth = ref();
  const phone = ref("");
  const address = ref("");
  const imageUpload = ref(null);
  const imageUploadEdit = ref();
  const ID_DG = localStorage.getItem("ID_DG");
  const fetchData = () => {
    axios
      .get("http://localhost:3000/authentication/info/" + ID_DG)
      .then((res) => {
        data.value = res.data;
        name.value = res.data.Ten;
        birth.value = res.data.NgaySinh;
        phone.value = res.data.DienThoai;
        address.value = res.data.DiaChi;
        imageUploadEdit.value = `http://localhost:3000/${res.data.avatar}`;
      })
      .catch((err) => console.log(err));
  };
  console.log(data)
  fetchData();
  const handleImageUpdate = (e) => {
    if (e.target.files && e.target.files[0]) {
      imageUploadEdit.value = URL.createObjectURL(e.target.files[0]);
      imageUpload.value = e.target.files[0];
    }
  };
  const handleSave = () => {
    const formData = new FormData();
    formData.append("avatar", imageUpload.value);
    formData.append("username", name.value);
    formData.append("phone", phone.value);
    formData.append("birth", birth.value);
    formData.append("address", address.value);
    axios
      .put("http://localhost:3000/authentication/edit/" + ID_DG, formData)
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else if (res.data.message) {
            data.value = res.data;
            toast.success(res.data.message);
            console.log(data.value)
          fetchData();
        }
      })
      .catch((err) => console.log(err));
  };
  </script>
  <style lang="scss" scoped>
  @import "./EditProfile.scss";
  </style>