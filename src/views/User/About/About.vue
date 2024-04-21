<template>
    <div class="containPage">
      <div class="titlePage">
        <!-- <h2>Coffee Menu</h2> -->
        <div class="groupSearch">
          <input
            class="inputSearch"
            v-model="searchQuery"
            type="search"
            placeholder="Tìm kiếm sách"
            aria-label="Search"
          />
          <span @click="searchBooks" class="iconSearch"
            ><i class="fa-solid fa-magnifying-glass"></i
          ></span>
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
                  <span class="content"> {{ item.MaNxb.TenNxb }}</span>
                </div>
              </div>
              <div class="actionItem">
                <button
                  v-if="isLoginDG"
                  class="btnAddToCart"
                  @click="showModalRentBook(item)"
                >
                  Mượn sách
                </button>
                <router-link v-else to="/login">
                  <button class="btnAddToCart">Mượn sách</button>
                </router-link>
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
        <!-- Modal rent  -->
        <a-modal
          style="top: 40px"
          v-model:open="isModalRentBook"
          width="800px"
          title="Mượn sách"
          @ok="handleOkRentBook"
          @cancel="handleCancelRentBook"
          okText="Xác nhận"
          cancelText="Đóng"
          :ok-button-props="okButtonAccess"
        >
          <form action="" enctype="multipart/form-data">
            <div class="contentModal row">
              <div class="leftModal col">
                <img class="imageLeftModal" :src="imageUploadRent" alt="" />
              </div>
              <div class="rightModal col">
                <div class="groupForm" style="opacity: 0.6">
                  <span>Tên sách:</span>
                  <input
                    type="text"
                    class="inputGroup"
                    v-model="selectedItem.TenSach"
                    name=""
                    disabled="true"
                  />
                </div>
                <div class="groupForm" style="opacity: 0.6">
                  <span>Đơn giá/ngày:</span>
                  <input
                    type="number"
                    class="inputGroup"
                    min="1"
                    v-model="selectedItem.DonGia"
                    name=""
                    disabled="true"
                  />
                </div>
                <div class="groupForm" style="opacity: 0.6">
                  <span>Số quyển:</span>
                  <input
                    type="number"
                    class="inputGroup"
                    v-model="selectedItem.SoQuyen"
                    name="soQuyen"
                    disabled="true"
                  />
                </div>
                <p class="errorText" v-if="errors.ngayMuon">
                  {{ errors.ngayMuon }}
                </p>
                <div class="groupForm">
                  <span>Ngày mượn</span>
                  <input
                    type="date"
                    min="1"
                    class="inputGroup"
                    v-model="ngayMuon"
                    name="ngayMuon"
                    @change="checkDate"
                  />
                </div>
                <p class="errorText" v-if="errors.ngayTra">
                  {{ errors.ngayTra }}
                </p>
                <div class="groupForm">
                  <span>Ngày trả</span>
                  <input
                    type="date"
                    min="1"
                    class="inputGroup"
                    v-model="ngayTra"
                    name="ngayTra"
                  />
                </div>
                <p class="errorText" v-if="errors.soLuong">
                  {{ errors.soLuong }}
                </p>
                <div class="groupForm">
                  <span>Số lượng:</span>
                  <input
                    min="1"
                    type="number"
                    class="inputGroup"
                    v-model="soLuong"
                    name="soLuong"
                  />
                </div>
                <div class="totalPrice">
                  Thành tiền:
                  <span
                    >{{
                      thanhTien(ngayMuon, ngayTra, soLuong, selectedItem.DonGia)
                    }}
                    VND
                  </span>
                </div>
              </div>
            </div>
          </form>
        </a-modal>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import axios from "axios";
  import { toast } from "vue3-toastify";
  
  const data = ref([]);
  const searchQuery = ref("");
  const isLoginDG = localStorage.getItem("isLoginDG");
  const idDocGia = localStorage.getItem("ID_DG");
  const isModalRentBook = ref(false);
  const selectedItem = ref(null);
  const imageUploadRent = ref("../../public/imageIcon.jpg");
  const soLuong = ref(1);
  const ngayMuon = ref();
  const ngayTra = ref();
  const maSach = ref("");
  const donGia = ref(0);
  
  const errors = ref({
    ngayMuon: "",
    ngayTra: "",
    soLuong: "",
  });
  
  const handleValidate = () => {
    const today = new Date();
    // Kiểm tra ngày mượn
    if (!ngayMuon.value) {
      errors.value.ngayMuon = "Vui lòng chọn ngày mượn.";
    } else if (new Date(ngayMuon.value) < today) {
      errors.value.ngayMuon = "Vui lòng chọn ngày mượn lớn hơn ngày hiện tại.";
    } else {
      errors.value.ngayMuon = "";
    }
  
    // Kiểm tra ngày trả
    if (!ngayTra.value) {
      errors.value.ngayTra = "Vui lòng chọn ngày trả.";
    } else if (
      new Date(ngayTra.value) < today ||
      new Date(ngayTra.value) < new Date(ngayMuon.value)
    ) {
      errors.value.ngayTra = "Ngày trả không thể nhỏ hơn  ngày mượn.";
    } else {
      errors.value.ngayTra = "";
    }
    // Kiểm tra số lượng
    if (soLuong.value < 0) {
      errors.value.soLuong = "Vui lòng chọn số lượng dương";
    } else if (!soLuong.value || soLuong.value > selectedItem.value.SoQuyen) {
      errors.value.soLuong = `Số lượng không thể lớn hơn ${selectedItem.value.SoQuyen}.`;
    } else {
      errors.value.soLuong = "";
    }
  };
  
  const fetchData = () => {
    axios
      .get("http://localhost:3000/book")
      .then((res) => {
        data.value = res.data;
        data.value = res.data.map((item) => ({
          ...item,
          SoLuong: 0,
          Size: "",
        }));
      })
      .catch((error) => {
        console.error("Lỗi khi nhận dữ liệu từ API", error);
      });
  };
  fetchData();
  
  function thanhTien(ngayBatDau, ngayKetThuc, soLuong, giaPerQuyen) {
    var startDate = new Date(ngayBatDau);
    var endDate = new Date(ngayKetThuc);
    var oneDay = 24 * 60 * 60 * 1000;
    var soNgay = Math.round(Math.abs((startDate - endDate) / oneDay) + 1);
    var tongTien = (soLuong * giaPerQuyen)/2;
    if (isNaN(tongTien)) {
      return 0;
    }
    return tongTien;
  }
  
  const showModalRentBook = (item) => {
    isModalRentBook.value = true;
    selectedItem.value = item;
    maSach.value = item._id;
    donGia.value = item.DonGia;
    imageUploadRent.value = `http://localhost:3000/${item.HinhSach}`;
  };
  
  const handleCancelRentBook = () => {
    isModalRentBook.value = false;
  };
  
  const handleOkRentBook = () => {
    handleValidate();
    console.log(idDocGia);
    const isValid = Object.values(errors.value).every((error) => !error);
    if (isValid) {
      const data = {
        maDocGia: idDocGia,
        maSach: maSach.value,
        ngayMuon: ngayMuon.value,
        ngayTra: ngayTra.value,
        soLuong: soLuong.value,
        thanhTien: thanhTien(
          ngayMuon.value,
          ngayTra.value,
          soLuong.value,
          donGia.value
        ),
      };
      axios
        .post("http://localhost:3000/rent", data)
        .then((res) => {
          if (res.data.error) {
            toast.error(res.data.error);
          } else {
            handleCancelRentBook();
            toast.success(res.data.message);
            fetchData();
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Form is invalid. Please check your inputs.");
    }
  };
  
  const searchBooks = () => {
    if (searchQuery.value.trim() === "") {
      toast.warn("Vui lòng nhập ký tự");
    } else {
      axios
        .get(`http://localhost:3000/book?tenSach=${searchQuery.value}`)
        .then((res) => {
          if (res.data.length > 0) {
            console.log("Data search", res.data);
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
  
  const okButtonAccess = {
    style: {
      background: "rgb(8, 172, 8)",
    },
  };
  </script>
  
  <style lang="scss" scoped>
  @import "./About.scss";
  </style>