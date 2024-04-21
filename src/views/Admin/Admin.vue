<template>
  <div class="containPage" v-if="isLogin">
    <h2>Dashboard</h2>
    <div class="contentPage">
      <div class="listCard">
        <div class="row pl-3">
          <div class="col">
            <div class="cardInfo">
              <div class="leftCard">
                <div class="iconCard">
                  <i class="fa-solid fa-cart-shopping"></i>
                </div>
              </div>
              <div class="rightCard">
                <div class="numberCard">
                  {{ totalOrder }}
                </div>
                <div class="nameCard">Đơn mượn</div>
              </div>
            </div>
          </div>
          <div class="col d-flex">
            <div class="cardInfo">
              <div class="leftCard">
                <div class="iconCard" style="background-color: #e9a4a4">
                  <i class="fa-solid fa-ban" style="color: #d50d0d"></i>
                </div>
              </div>
              <div class="rightCard">
                <div class="numberCard">
                  {{ totalDenied }}
                </div>
                <div class="nameCard">Đơn mượn đã hủy</div>
              </div>
            </div>
          </div>
          <div class="col d-flex">
            <div class="cardInfo">
              <div class="leftCard">
                <div class="iconCard" style="background-color: #cbe2ff">
                  <i
                    class="fa-solid fa-hourglass-half"
                    style="color: #007bff"
                  ></i>
                </div>
              </div>
              <div class="rightCard">
                <div class="numberCard">
                  {{ totalPending }}
                </div>
                <div class="nameCard">Đơn mượn chờ</div>
              </div>
            </div>
          </div>
          <div class="col d-flex">
            <div class="cardInfo">
              <div class="leftCard">
                <div class="iconCard" style="background-color: #cdf1ef">
                  <i class="fa-solid fa-user-tie" style="color: #05b9aa"></i>
                </div>
              </div>
              <div class="rightCard">
                <div class="numberCard">
                  {{ totalStaff }}
                </div>
                <div class="nameCard">Tổng nhân viên</div>
              </div>
            </div>
          </div>
          <div class="col d-flex">
            <div class="cardInfo">
              <div class="leftCard">
                <div class="iconCard" style="background-color: #e5cff7">
                  <i class="fa-solid fa-user" style="color: #bc7af9"></i>
                </div>
              </div>
              <div class="rightCard">
                <div class="numberCard">
                  {{ totalCustomer }}
                </div>
                <div class="nameCard">Tổng độc giả</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 class="px-4 mt-2 mb-0">Đơn mượn sách</h3>
      <div class="ordersCustomer mt-1">
        <table class="table table-hover text-center">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên độc giả</th>
              <th scope="col">Tên sách</th>
              <th scope="col">Ngày mượn</th>
              <th scope="col">Ngày trả</th>
              <th scope="col">Số quyển</th>
              <th scope="col">Số tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <td colspan="10" v-if="listRents.length === 0">
              <p class="pt-2">Danh sách order trống</p>
            </td>
            <tr v-for="(rent, index) in listRents" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ rent.MaDocGia.Ten }}</td>
              <td>{{ rent.MaSach.TenSach }}</td>
              <td>{{ formatDateTime(rent.NgayMuon) }}</td>
              <td>{{ formatDateTime(rent.NgayTra) }}</td>
              <td>{{ rent.SoLuong }}</td>
              <td>{{ rent.ThanhTien }} VND</td>
              <td class="d-flex justify-content-center">
                <button @click="showModalAccess(rent, index)" class="accept">
                  <i class="fa-solid fa-check"></i>
                </button>
                <button class="reject" @click="showModalDeny(rent, index)">
                  <i class="fa-solid fa-x"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <a-modal
        style="top: 40px"
        v-model:open="isModalAccess"
        title="Xác nhận duyệt đơn mượn"
        @ok="handleOkAccess()"
        :ok-button-props="okButtonAccess"
        @cancel="handleCancelAccess"
        cancelText="Đóng"
        okText="Xác nhận"
      >
        <p>Bạn có chắc muốn duyệt đơn mượn số: {{ indexSelected + 1 }}</p>
      </a-modal>
      <a-modal
        style="top: 40px"
        v-model:open="isModalDeny"
        title="Xác nhận hủy đơn mượn"
        @ok="handleOkDeny()"
        :ok-button-props="okButtonDeny"
        @cancel="handleCancelDeny"
        cancelText="Đóng"
        okText="Xác nhận"
      >
        <p>Bạn có chắc muốn hủy đơn mượn số: {{ indexSelected + 1 }}</p>
      </a-modal>
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

const listRents = ref([]);
const totalCustomer = ref("");
const totalOrder = ref("");
const totalDenied = ref("");
const totalPending = ref("");
const totalStaff = ref("");
const isModalAccess = ref(false);
const isModalDeny = ref(false);
const isLogin = localStorage.getItem("isLogin");
const rentChoice = ref(null);
const indexSelected = ref(null);

const showModalAccess = (rent, index) => {
  isModalAccess.value = true;
  rentChoice.value = rent;
  indexSelected.value = index;
};
const showModalDeny = (rent) => {
  isModalDeny.value = true;
  rentChoice.value = rent;
};
const handleCancelAccess = () => {
  isModalAccess.value = false;
};
const handleCancelDeny = () => {
  isModalDeny.value = false;
};

const fetchData = () => {
  axios
    .get("http://localhost:3000/rent?trangThai=W")
    .then((res) => {
      listRents.value = res.data;
    })
    .catch((err) => console.log(err));
};
fetchData();

const dashBoard = () => {
  axios
    .get("http://localhost:3000/reader/dashboard")
    .then((res) => {
      totalCustomer.value = res.data.user;
      totalStaff.value = res.data.staff;
      totalOrder.value = res.data.rent.length;
      totalDenied.value = res.data.rentDenied.length;
      totalPending.value = res.data.rentWaiting.length;
    })
    .catch((err) => console.log(err));
};
dashBoard();

const formatDateTime = (dateTime) => {
  return moment(dateTime).format("DD-MM-YYYY HH:mm:ss");
};

const handleOkAccess = () => {
  console.log(rentChoice.value._id);
  axios
    .put("http://localhost:3000/rent/" + rentChoice.value._id, {
      trangThai: "A",
      traSach: "W",
    })
    .then((res) => {
      console.log(res);
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        handleCancelAccess();
        fetchData();
        dashBoard();
        toast.success("Đã duyệt đơn mượn thành công.");
      }
    })
    .catch((err) => console.log(err));
};

const handleOkDeny = () => {
  axios
    .put("http://localhost:3000/rent/" + rentChoice.value._id, {
      trangThai: "D",
    })
    .then((res) => {
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        handleCancelDeny();
        fetchData();
        dashBoard();
        toast.success("Đã từ chối đơn mượn thành công.");
      }
    })
    .catch((err) => console.log(err));
};

const okButtonDeny = {
  style: {
    background: "red",
  },
};

const okButtonAccess = {
  style: {
    background: "rgb(8, 172, 8)",
  },
};
</script>
<style lang="scss" scoped>
@import "./Admin.scss";
</style>