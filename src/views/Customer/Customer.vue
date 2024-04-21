<template>
  <div class="containPage" v-if="isLogin">
    <h2>Danh sách người dùng</h2>
    <div class="contentPage" :style="`${isLogin ? '' : 'display: none'}`">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Độc giả">
          <h4>Danh sách độc giả</h4>
          <a-table :dataSource="data" :columns="columns" rowKey="_id">
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Nhân viên" force-render>
          <h4>Danh sách nhân viên</h4>
          <a-table :dataSource="dataStaff" :columns="columnsStaff" rowKey="_id">
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
  <div v-else class="denied">
    <h3 class="text-center mt-5">Vui lòng đăng nhập để xử dụng dịch vụ</h3>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const activeKey = ref("1");
const data = ref([]);
const dataStaff = ref([]);

const isLogin = localStorage.getItem("isLogin");

const columns = [
  {
    title: "Id đọc giả",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Tên",
    dataIndex: "Ten",
    key: "Ten",
  },
  {
    title: "Ngày sinh",
    dataIndex: "NgaySinh",
    key: "NgaySinh",
  },
  {
    title: "Giới tính",
    dataIndex: "Phai",
    key: "Phai",
  },
  {
    title: "Số điện thoại",
    dataIndex: "DienThoai",
    key: "DienThoai",
  },
  {
    title: "Địa chỉ",
    dataIndex: "DiaChi",
    key: "DiaChi",
  },
];

const columnsStaff = [
  {
    title: "Id user",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Họ tên",
    dataIndex: "HoTenNv",
    key: "HoTenNv",
  },
  {
    title: "Chức vụ",
    dataIndex: "ChucVu",
    key: "ChucVu",
  },
  {
    title: "Số điện thoại",
    dataIndex: "SoDienThoai",
    key: "SoDienThoai",
  },
  {
    title: "Địa chỉ",
    dataIndex: "DiaChi",
    key: "DiaChi",
  },
];

const fetchData = () => {
  axios
    .get("http://localhost:3000/reader")
    .then((res) => {
      data.value = res.data;
    })
    .catch((err) => console.log(err));
};

const fetchDataStaff = () => {
  axios
    .get("http://localhost:3000/reader/admin")
    .then((res) => {
      dataStaff.value = res.data;
    })
    .catch((err) => console.log(err));
};

fetchData();
fetchDataStaff();
</script>

<style lang="scss" scoped>
@import "./Customer.scss";
</style>