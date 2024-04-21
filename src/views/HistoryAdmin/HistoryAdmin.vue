<template>
  <div class="containPage" v-if="isLogin">
    <div class="d-flex justify-content-between align-items-center">
      <h2>Đơn mượn đã duyệt</h2>
      <div class="groundFilter">
        <select v-model="searchTrangThai" class="filter">
          <option value="">Trạng thái mượn</option>
          <option value="W">Chờ nhận</option>
          <option value="D">Đang mượn</option>
          <option value="Y">Đã trả</option>
          <option value="N">Chưa trả</option>
        </select>
        <button class="btn-filter" @click="searchDocGia">Lọc</button>
      </div>
      <div class="search">
        <input
          class="inputSearch"
          v-model="searchQuery"
          type="search"
          placeholder="Tìm kiếm đọc giả"
          aria-label="Search"
        />
        <span @click="searchDocGia" class="iconSearch"
          ><i class="fa-solid fa-magnifying-glass"></i
        ></span>
      </div>
    </div>
    <div class="contentPage" :style="`${isLogin ? '' : 'display: none'}`">
      <div class="list-group">
        <div v-if="dataRented.length === 0" class="orderEmpty">
          <p>Đơn mượn trống</p>
        </div>
        <div
          v-for="(rented, index) in dataRented"
          :key="rented._id"
          class="list-group-item list-group-item-action mt-3 rounded"
        >
          <div class="infoUser mb-2">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="font-weight-bold">Thông tin độc giả:</h5>
              <p
                class="m-0 font-weight-bold"
                style="color: #40c1fa; font-size: 1.4rem"
              >
                <span class="mr-2">{{ index + 1 }}</span>
                <a-dropdown class="ml-auto">
                  <a class="ant-dropdown-link" @click.prevent>
                    <i class="fa-solid fa-ellipsis-vertical fa-primary"></i>
                  </a>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item>
                        <a @click="showModal(rented)"
                          ><i class="fa-solid fa-pen" style="color: blue"></i
                        ></a>
                      </a-menu-item>
                      <a-menu-item>
                        <a @click="showModalDelete(rented)"
                          ><i class="fa-solid fa-trash" style="color: red"></i
                        ></a>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </p>
            </div>

            <p class="d-inline">
              Họ tên: {{ rented.MaDocGia.HoLot }} {{ rented.MaDocGia.Ten }}
            </p>
            <p class="ml-3 d-inline">
              Số điện thoại: {{ rented.MaDocGia.DienThoai }}
            </p>
            <p class="ml-3 d-inline">Địa chỉ: {{ rented.MaDocGia.DiaChi }}</p>
          </div>
          <div class="d-flex">
            <h5 style="font-size: 1.2rem">Chi tiết đơn mượn:</h5>
            <a-modal
              style="top: 40px"
              v-model:open="isModalDelete"
              title="Xóa đơn mượn"
              @ok="handleOkDelete()"
              :ok-button-props="okButtonProps"
              @cancel="handleCancelDelete"
              cancelText="Đóng"
              okText="Xóa đơn mượn"
            >
              <p>Bạn có chắc muốn xóa đơn mượn.</p>
            </a-modal>
            <a-modal
              style="top: 40px"
              v-model:open="isModal"
              width="500px"
              title="Cập nhật trạng thái mượn"
              @ok="handleOkUpdateTraSach"
              @cancel="handleCancelUpdate"
              :ok-button-props="okButtonAccess"
              cancelText="Đóng"
              okText="Xác nhận"
            >
              <select v-model="selectedValue" class="select-options">
                <option value="">Chọn trạng thái mượn sách</option>
                <option value="W">Chờ nhận</option>
                <option value="D">Đang mượn</option>
                <option value="Y">Đã trả</option>
                <option value="N">Chưa trả</option>
              </select>
              <div
                :style="`${
                  errorStatus
                    ? 'margin-top: 8px; color: red; font-size: 1rem'
                    : 'display: none'
                }`"
              >
                {{ errorStatus }}
              </div>
            </a-modal>
          </div>
          <table class="table text-center">
            <thead>
              <tr class="table-borderless">
                <th scope="col">Tên sách</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Đơn giá/ngày</th>
                <th scope="col">Trạng thái mượn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ rented.MaSach.TenSach }}</td>
                <td>{{ rented.SoLuong }}</td>
                <td>{{ rented.MaSach.DonGia }} VND</td>
                <td
                  :style="`${
                    rented.TraSach === 'Y'
                      ? 'color: green; font-weight: bold;'
                      : rented.TraSach === 'N'
                      ? 'color: red; font-weight: bold;'
                      : rented.TraSach === 'W'
                      ? 'color: blue; font-weight: bold;'
                      : rented.TraSach === 'D'
                      ? 'color: orange; font-weight: bold;'
                      : 'color: black; font-weight: bold;'
                  }`"
                >
                  {{
                    rented.TraSach === "Y"
                      ? "Đã trả"
                      : rented.TraSach === "N"
                      ? "Chưa trả"
                      : rented.TraSach === "W"
                      ? "Chờ nhận"
                      : rented.TraSach === "D"
                      ? "Đang mượn"
                      : "Không có"
                  }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex">
            <div>
              <p>
                Thành tiền:
                <span style="color: #d50d0d; font-weight: bold"
                  >{{ rented.ThanhTien }} VND</span
                >
              </p>
              <p class="d-inline">
                Ngày mượn sách: {{ formatDateTime(rented.NgayMuon) }}
              </p>
              <p class="d-inline ml-3">
                Ngày trả sách: {{ formatDateTime(rented.NgayTra) }}
              </p>
            </div>
            <div
              v-if="rented.TrangThai === 'A'"
              class="statusOrderSuccess mr-0 mb-0"
            >
              Đã duyệt
            </div>
            <div v-else class="statusOrderWait mr-0 mb-0">Đã hủy</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="denied">
    <h3 class="text-center mt-5">Vui lòng đăng nhập để xử dụng dịch vụ</h3>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import moment from "moment";

const dataRented = ref([]);
const isLogin = localStorage.getItem("isLogin");
const selectedValue = ref("");
const errorStatus = ref("");
const searchQuery = ref("");
const searchTrangThai = ref("");

const fetchData = () => {
  axios
    .get("http://localhost:3000/rent")
    .then((res) => {
      dataRented.value = res.data.filter((item) => item.TrangThai !== "W");
    })
    .catch((err) => console.log(err));
};
fetchData();

const searchDocGia = () => {
  axios
    .get(
      `http://localhost:3000/rent/filter-TenSach?tenDocGia=${searchQuery.value}&traSach=${searchTrangThai.value}`
    )
    .then((res) => {
      if (res.data.length > 0) {
        const dataFilter = res.data
        console.log(dataFilter);
        dataRented.value = res.data.filter((item) => item.TrangThai !== "W");
      } else {
        dataRented.value = [];
      }
    })
    .catch((error) => {
      console.error("Lỗi khi nhận dữ liệu từ API", error);
    });
};

const formatDateTime = (dateTime) => {
  return moment(dateTime).format("DD-MM-YYYY HH:mm:ss");
};

const isModal = ref(false);
const showModal = (order) => {
  isModal.value = true;
  idOrder.value = order._id;
};

const handleCancelUpdate = () => {
  isModal.value = false;
  errorStatus.value = "";
  selectedValue.value = "";
};

const handleOkUpdateTraSach = () => {
  if (selectedValue.value === "") {
    errorStatus.value = "Vui lòng chọn trạng thái mượn sách.";
  } else {
    axios
      .put("http://localhost:3000/rent/" + idOrder.value, {
        traSach: selectedValue.value,
      })
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          handleCancelUpdate();
          fetchData();
          toast.success("Đã cập nhật trạng thái mượn thành công.");
        }
      })
      .catch((err) => console.log(err));
  }
};

const isModalDelete = ref(false);
const idOrder = ref("");

const showModalDelete = (order) => {
  isModalDelete.value = true;
  idOrder.value = order._id;
};

const handleCancelDelete = () => {
  isModalDelete.value = false;
};

const handleOkDelete = () => {
  axios
    .delete("http://localhost:3000/rent/" + idOrder.value)
    .then((res) => {
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        handleCancelDelete();
        fetchData();
        toast.success(res.data.message);
      }
    })
    .catch((err) => console.log(err));
};

const okButtonProps = {
  style: {
    background: "red", // Đặt màu đỏ cho nút "OK"
  },
};

const okButtonAccess = {
  style: {
    background: "rgb(8, 172, 8)",
  },
};
</script>

<style lang="scss" scoped>
@import "./HistoryAdmin.scss";
</style>