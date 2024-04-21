<template>
  <div class="containPage" v-if="isLogin">
    <div class="titlePage d-flex">
      <div class="groupSearch">
        <input
          class="inputSearch"
          v-model="searchQuery"
          type="search"
          placeholder="Tìm kiếm tên sách"
          aria-label="Search"
        />
        <span @click="searchBooks" class="iconSearch"
          ><i class="fa-solid fa-magnifying-glass"></i
        ></span>
      </div>
      <div class="ml-auto">
        <button v-if="isLogin" @click="showModal" class="btnAdd">
          <i class="fa-solid fa-book-open"></i> Thêm sách
        </button>
        <router-link to="/admin/login" v-else>
          <button @click="showModal" class="btnAdd">
            <i class="fa-solid fa-mug-hot"></i> Thêm
          </button>
        </router-link>
      </div>
    </div>
    <div class="contentPage">
      <div class="row" v-if="data.length > 0">
        <div class="col-md-4" v-for="(item, index) in data" :key="index">
          <div class="item">
            <div class="leftItem">
              <img
                :src="'http://localhost:3000/' + item.HinhSach"
                alt="Image"
                class="imageItem"
              />
            </div>
            <div class="rightItem">
              <div class="dataItem">
                <span class="title">Tên sách:</span>
                <span class="content"> {{ item.TenSach }}</span>
              </div>
              <div class="dataItem">
                <span class="title">Số quyển:</span>
                <span class="content">{{ item.SoQuyen }}</span>
              </div>
              <div class="dataItem">
                <span class="title">Đơn giá:</span>
                <span class="content">{{ item.DonGia }} VND</span>
              </div>
              <div class="dataItem">
                <span class="title">Năm xuất bản:</span>
                <span class="content"> {{ item.NamXuatBan }}</span>
              </div>
              <div class="dataItem">
                <span class="title">Nhà xuất bản:</span>
                <span class="content"> {{ item.MaNxb ? item.MaNxb.TenNxb : '' }}</span>
              </div>
            </div>
            <div class="actionItem">
              <button
                @click="showModalEdit(item)"
                :style="`${isLogin ? '' : 'display: none'}`"
                class="edit"
              >
                <i class="fa-solid fa-pen"></i>
                Sửa
              </button>
              <button
                @click="showModalDelete(item)"
                :style="`${isLogin ? '' : 'display: none'}`"
                class="remove"
              >
                <i class="fa-solid fa-trash iconRemove"></i>
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="text-center"
        style="font-weight: bold; font-size: 18px"
      >
        <p>Không tìm thấy sách</p>
      </div>

      <!-- Modal add -->
      <a-modal
        style="top: 40px"
        v-model:open="isModal"
        width="800px"
        title="Thêm sách"
        @ok="handleOk"
        @cancel="handleCancel"
        okText="Thêm sách"
        cancelText="Đóng"
      >
        <form action="" enctype="multipart/form-data">
          <div class="contentModal row">
            <div class="leftModal col">
              <img class="imageLeftModal" :src="imageUpload" alt="" />
              <div class="btnAddImage d-flex">
                <label for="image"
                  ><i class="fa-solid fa-image iconModal"></i>Thêm ảnh
                  sách</label
                >
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/jpeg, image/png, image/jpg"
                  @change="handleImage"
                  required
                />
              </div>
            </div>
            <div class="rightModal col">
              <div class="groupForm">
                <span>Tên sách:</span>
                <input
                  type="text"
                  class="inputGroup"
                  v-model="tenSach"
                  name="tenSach"
                  id=""
                  placeholder="Tên sách"
                  autocomplete="off"
                />
              </div>
              <p class="errorText" v-if="errors.name">{{ errors.name }}</p>
              <div class="groupForm">
                <span>Đơn giá:</span>
                <input
                  type="number"
                  min="0"
                  class="inputGroup"
                  v-model="donGia"
                  name="donGia"
                  id=""
                  placeholder="Đơn Giá"
                  autocomplete="off"
                />
              </div>
              <p class="errorText" v-if="errors.price">{{ errors.price }}</p>
              <div class="groupForm">
                <span>Số quyển:</span>
                <input
                  type="number"
                  min="1"
                  class="inputGroup"
                  v-model="soQuyen"
                  name="soQuyen"
                  id=""
                  placeholder="Số quyển sách"
                  autocomplete="off"
                />
              </div>
              <p class="errorText" v-if="errors.NamXuatBan">
                {{ errors.NamXuatBan }}
              </p>
              <div class="groupForm">
                <span>Năm xuất bản:</span>
                <input
                  type="number"
                  class="inputGroup"
                  min="1"
                  v-model="namXuatBan"
                  name="namXuatBan"
                  id=""
                  placeholder="Năm xuất bản"
                  autocomplete="off"
                />
              </div>
              <p class="errorText" v-if="errors.nxb">
                {{ errors.nxb }}
              </p>
              <div class="groupForm">
                <span>Nhà xuất bản:</span>
                <select v-model="idNxb">
                  <option value="">Chọn nhà xuất bản</option>
                  <option
                    v-for="(item, index) in listNxbs"
                    :key="index"
                    :value="item._id"
                  >
                    {{ item.TenNxb }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </a-modal>

      <!-- Modal edit  -->
      <a-modal
        style="top: 40px"
        v-model:open="isModalEdit"
        width="800px"
        title="Chỉnh sửa sách"
        @ok="handleOkEdit"
        @cancel="handleCancelEdit"
        okText="Cập nhật"
        cancelText="Đóng"
      >
        <form action="" enctype="multipart/form-data">
          <div class="contentModal row">
            <div class="leftModal col">
              <img class="imageLeftModal" :src="imageUploadEdit" alt="" />
              <div class="btnAddImage d-flex">
                <label for="image"
                  ><i class="fa-solid fa-image iconModal"></i>Cập nhật
                  ảnh</label
                >
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/jpeg, image/png, image/jpg"
                  @change="handleImageUpdate"
                  required
                />
              </div>
            </div>
            <div class="rightModal col">
              <div class="groupForm">
                <span>Tên sách:</span>
                <input
                  type="text"
                  class="inputGroup"
                  v-model="selectedItem.TenSach"
                  name="tenSach"
                  id=""
                  placeholder="Tên sách"
                  autocomplete="off"
                />
              </div>
              <p class="errorText" v-if="errors.name">{{ errors.name }}</p>
              <div class="groupForm">
                <span>Đơn giá:</span>
                <input
                  type="number"
                  class="inputGroup"
                  min="1"
                  v-model="selectedItem.DonGia"
                  name="donGia"
                  id=""
                  placeholder="Giá sách"
                  autocomplete="off"
                />
              </div>
              <p class="errorText" v-if="errors.price">{{ errors.price }}</p>

              <div class="groupForm">
                <span>Số quyển:</span>
                <input
                  type="number"
                  min="1"
                  class="inputGroup"
                  v-model="selectedItem.SoQuyen"
                  name="soQuyen"
                  id=""
                  placeholder="Số lượng sách"
                  autocomplete="off"
                />
              </div>
              <p class="errorText" v-if="errors.NamXuatBan">
                {{ errors.namXuatBan }}
              </p>
              <div class="groupForm">
                <span>Năm xuất bản</span>
                <input
                  type="number"
                  min="1"
                  class="inputGroup"
                  v-model="selectedItem.NamXuatBan"
                  name="namXuatBan"
                  id=""
                  placeholder="Năm xuất bản"
                  autocomplete="off"
                />
              </div>
              <div class="groupForm">
                <span>Nhà xuất bản:</span>
                <select v-model="selectedItem.MaNxb._id">
                  <option
                    v-for="(item, index) in listNxbs"
                    :key="index"
                    :value="item._id"
                  >
                    {{ item.TenNxb }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </a-modal>

      <!-- Modal Delete -->
      <a-modal
        style="top: 40px"
        v-model:open="isModalDelete"
        title="Xóa sách"
        @ok="handleOkDelete"
        @cancel="handleCancelDelete"
        :ok-button-props="okButtonProps"
        okText="Xác nhận"
        cancelText="Đóng"
      >
        <p>Bạn có chắc muốn xóa sách: {{ selectedItem.TenSach }}</p>
      </a-modal>
    </div>
  </div>
  <div v-else class="denied">
    <h3 class="text-center mt-5">Vui lòng đăng nhập để xử dụng dịch vụ</h3>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { toast } from "vue3-toastify";
const tenSach = ref("");
const donGia = ref(1);
const soQuyen = ref(1);
const namXuatBan = ref(1);
const idNxb = ref("");
const image = ref();
const data = ref([]);
const listNxbs = ref([]);
const searchQuery = ref("");

const isLogin = localStorage.getItem("isLogin");

const fetchData = () => {
  axios
    .get("http://localhost:3000/book")
    .then((res) => {
      data.value = res.data;
    })
    .catch((err) => console.log(err));
};

const fetchDataNxb = () => {
  axios
    .get("http://localhost:3000/published")
    .then((res) => {
      listNxbs.value = res.data;
    })
    .catch((err) => console.log(err));
};

fetchData();
fetchDataNxb();

const searchBooks = () => {
  if (searchQuery.value.trim() === "") {
    toast.warn("Vui lòng nhập tên sách");
  } else {
    axios
      .get(`http://localhost:3000/book?tenSach=${searchQuery.value}`)
      .then((res) => {
        if (res.data.length > 0) {
          console.log(res.data);
          data.value = res.data;
        } else {
          data.value = [];
        }
      })
      .catch((error) => {
        console.error("Lỗi khi nhận dữ liệu từ API", error);
      });
  }
};

const isModal = ref(false);
const showModal = () => {
  isModal.value = true;
};

const handleCancel = () => {
  tenSach.value = "";
  donGia.value = 0;
  soQuyen.value = 0;
  namXuatBan.value = 0;
  idNxb.value = "";
  image.value = {};
  imageUpload.value = "../../public/imageIcon.jpg";
  isModal.value = false;
};

const errors = ref({
  name: "",
  price: "",
  picture: "",
  namXuatBan: "",
  nxb: "",
});

const handleValidate = () => {
  errors.value.name = tenSach.value.trim() ? "" : "Vui lòng nhập tên sách";
  errors.value.nxb = idNxb.value.trim() ? "" : "Vui lòng chọn nhà xuất bản";
  if (donGia.value <= 0) {
    errors.value.price = "Giá phải là số nguyên dương";
  } else {
    errors.value.price = "";
  }
  if (isNaN(soQuyen.value) || soQuyen.value <= 0) {
    errors.value.NamXuatBan = "Số lượng phải là số dương";
  } else {
    errors.value.NamXuatBan = "";
  }
};

const handleOk = () => {
  handleValidate();
  const isValid = Object.values(errors.value).every((error) => !error);
  if (isValid) {
    const formData = new FormData();
    formData.append("image", image.value);
    formData.append("TenSach", tenSach.value);
    formData.append("DonGia", donGia.value);
    formData.append("SoQuyen", soQuyen.value);
    formData.append("NamXuatBan", namXuatBan.value);
    formData.append("MaNxb", idNxb.value);
    axios
      .post("http://localhost:3000/book", formData)
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else if (res.data.update) {
          handleCancel();
          toast.info(res.data.update);
          fetchData();
        } else {
          handleCancel();
          toast.success(res.data.message);
          fetchData();
        }
      })
      .catch((err) => console.log(err));
  } else {
    console.log("Form is invalid. Please check your inputs.");
  }
};
// image
const imageUpload = ref("../../public/imageIcon.jpg");

const handleImage = (e) => {
  if (e.target.files && e.target.files[0]) {
    imageUpload.value = URL.createObjectURL(e.target.files[0]);
    image.value = e.target.files[0];
  }
};

// Modal edit
const imageUploadEdit = ref("../../public/imageIcon.jpg");
const isModalEdit = ref(false);
const selectedItem = ref(null);
const imageUpdate = ref();

const showModalEdit = (item) => {
  isModalEdit.value = true;
  selectedItem.value = item;
  imageUploadEdit.value = `http://localhost:3000/${item.HinhSach}`;
};

const handleImageUpdate = (e) => {
  if (e.target.files && e.target.files[0]) {
    imageUploadEdit.value = URL.createObjectURL(e.target.files[0]);
    image.value = e.target.files[0];
  }
};
const handleCancelEdit = () => {
  isModalEdit.value = false;
  imageUpdate.value = null;
};

const handleOkEdit = () => {
  handleValidate();
  isModalEdit.value = false;
  const formData = new FormData();
  formData.append("image", image.value);
  formData.append("TenSach", selectedItem.value.TenSach);
  formData.append("DonGia", selectedItem.value.DonGia);
  formData.append("SoQuyen", selectedItem.value.SoQuyen);
  formData.append("NamXuatBan", selectedItem.value.NamXuatBan);
  formData.append("MaNxb", selectedItem.value.MaNxb._id);
  axios
    .put("http://localhost:3000/book/" + selectedItem.value._id, formData)
    .then((res) => {
      if (res.data.error) {
        toast.error(res.data.error);
      } else if (res.data.message) {
        handleCancel();
        toast.success(res.data.message);
        fetchData();
      }
    })
    .catch((err) => console.log(err));
};
// Modal delete
const isModalDelete = ref(false);

const handleCancelDelete = () => {
  isModalDelete.value = false;
};
const showModalDelete = (item) => {
  isModalDelete.value = true;
  selectedItem.value = item;
};
const handleOkDelete = () => {
  axios
    .delete("http://localhost:3000/book/" + selectedItem.value._id)
    .then((res) => {
      if (res.data.error) {
        toast.error(res.data.error);
      } else if (res.data.message) {
        handleCancelDelete();

        toast.success(res.data.message);
        fetchData();
      }
    })
    .catch((err) => console.log(err));
};
const okButtonProps = {
  style: {
    background: "red", // Đặt màu đỏ cho nút "OK"
  },
};
</script>

<style lang="scss" scoped>
@import "./AboutAdmin.scss";
</style>