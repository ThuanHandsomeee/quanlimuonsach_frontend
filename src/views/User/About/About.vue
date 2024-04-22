<template>
  <div class="containPage">
    <div class="titlePage">
      <h2>Explore Our Library</h2>
      <div class="searchBar">
        <input class="searchInput" v-model="searchQuery" type="search" placeholder="Search for books"
          aria-label="Search" />
        <span @click="searchBooks" class="searchIcon">
          <i class="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>
    </div>
    <div class="contentPage">
      <div class="bookList" v-if="data.length > 0">
        <div class="bookItem" v-for="(item, index) in data" :key="index">
          <div class="bookImage">
            <img :src="'http://localhost:3000/' + item.HinhSach" alt="Book Cover" />
          </div>
          <div class="bookDetails">
            <div class="detailRow">
              <span class="detailLabel">Tên Sách:</span>
              <span class="detailContent">{{ item.TenSach }}</span>
            </div>
            <div class="detailRow">
              <span class="detailLabel">Số lượng:</span>
              <span class="detailContent">{{ item.SoQuyen }}</span>
            </div>
            <div class="detailRow">
              <span class="detailLabel">Giá thuê:</span>
              <span class="detailContent">{{ item.DonGia }} VND/Ngày</span>
            </div>
            <div class="detailRow">
              <span class="detailLabel">Năm xuất bản:</span>
              <span class="detailContent">{{ item.NamXuatBan }}</span>
            </div>
            <div class="detailRow">
              <span class="detailLabel">Nhà xuất bản:</span>
              <span class="detailContent">{{ item.MaNxb.TenNxb }}</span>
            </div>
          </div>
          <div class="bookActions">
            <button v-if="isLoginDG" class="btnRentBook" @click="showModalRentBook(item)">
              Thuê
            </button>
            <router-link v-else to="/login">
              <button class="btnRentBook">Thuê</button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="noBooks" v-else>
        <p>No books found</p>
      </div>
    </div>
    <!-- Modal -->
    <a-modal v-model:open="isModalRentBook" width="800px" title="Mượn sách" @ok="handleOkRentBook"
      @cancel="handleCancelRentBook" okText="Xác nhận" cancelText="Close" :ok-button-props="okButtonPrimary">
      <form action="" enctype="multipart/form-data">
        <div class="modalContent">
          <div class="modalImage">
            <img class="imageLeftModal" :src="imageUploadRent" alt="Selected Book" />
          </div>
          <div class="modalForm">
            <div class="formGroup">
              <label for="bookName">Tên sách:</label>
              <input type="text" class="inputField" v-model="selectedItem.TenSach" disabled />
            </div>
            <div class="formGroup">
              <label for="pricePerDay">Giá thuê/Ngày:</label>
              <input type="number" class="inputField" v-model="selectedItem.DonGia" disabled />
            </div>
            <div class="formGroup">
              <label for="quantity">Số lượng:</label>
              <input type="number" class="inputField" v-model="selectedItem.SoQuyen" disabled />
            </div>
            <div class="formGroup">
              <label for="rentDate">Ngày mượn</label>
              <input type="date" class="inputField" v-model="ngayMuon" @change="checkDate" />
            </div>
            <div class="formGroup">
              <label for="returnDate">Ngày trả</label>
              <input type="date" class="inputField" v-model="ngayTra" />
            </div>
            <div class="formGroup">
              <label for="quantityToRent">Số lượng muốn mượn:</label>
              <input type="number" class="inputField" v-model="soLuong" />
            </div>
            <div class="totalPrice">
              Thành tiền:
              <span>
                {{
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
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
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
  if (!ngayMuon.value) {
    errors.value.ngayMuon = "Please select rent date.";
  } else if (new Date(ngayMuon.value) < today) {
    errors.value.ngayMuon = "Rent date cannot be in the past.";
  } else {
    errors.value.ngayMuon = "";
  }

  if (!ngayTra.value) {
    errors.value.ngayTra = "Please select return date.";
  } else if (
    new Date(ngayTra.value) < today ||
    new Date(ngayTra.value) < new Date(ngayMuon.value)
  ) {
    errors.value.ngayTra = "Return date cannot be before rent date.";
  } else {
    errors.value.ngayTra = "";
  }

  if (soLuong.value < 0) {
    errors.value.soLuong = "Please select a positive quantity.";
  } else if (!soLuong.value || soLuong.value > selectedItem.value.SoQuyen) {
    errors.value.soLuong = `Quantity cannot exceed ${selectedItem.value.SoQuyen}.`;
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
      console.error("Error fetching data from API", error);
    });
};
fetchData();

const thanhTien = (ngayBatDau, ngayKetThuc, soLuong, giaPerQuyen) => {
  const startDate = new Date(ngayBatDau);
  const endDate = new Date(ngayKetThuc);
  const oneDay = 24 * 60 * 60 * 1000;
  const soNgay = Math.round(Math.abs((startDate - endDate) / oneDay) + 1);
  const tongTien = (soLuong * giaPerQuyen * soNgay);
  if (isNaN(tongTien)) {
    return 0;
  }
  return tongTien;
};

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
    toast.warn("Please enter a character");
  } else {
    axios
      .get(`http://localhost:3000/book?tenSach=${searchQuery.value}`)
      .then((res) => {
        if (res.data.length > 0) {
          data.value = res.data;
        } else {
          data.value = [];
        }
      })
      .catch((error) => {
        console.error("Error fetching data from API", error);
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

.searchBar {
  display: flex;
  align-items: center;
}

.searchInput {
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 5px 0 0 5px;
  outline: none;
}

.searchIcon {
  background-color: #ddd;
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-left: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.bookList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.bookItem {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.bookImage {
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: center;

}

.bookImage img {
  width: 200px; // Chiều rộng cố định của ảnh
  height: 300px; // Chiều cao cố định của ảnh
  object-fit: cover; // Đảm bảo ảnh phủ đầy khung hình mà không bị méo
  border-radius: 5px;
}

.detailRow {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.detailLabel {
  font-weight: bold;
  margin-right: 0.5rem;
}

.bookActions {
  margin-top: auto;
  align-items: center;
  justify-content: center;
  display: flex;
}

.btnRentBook {
  background-color: #00d9ff;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.noBooks {
  text-align: center;
  font-weight: bold;
  font-size: 1.25rem;
  margin-top: 2rem;
}

.modalContent {
  display: flex;
  align-items: center;
}

.modalImage {
  flex: 1;
  margin-right: 2rem;
}

.modalImage img {
  max-width: 100%;
  height: auto;
}

.modalForm {
  flex: 2;
}

.inputField {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.totalPrice {
  font-weight: bold;
  font-size: 1.25rem;
  margin-top: 1rem;
}
</style>
