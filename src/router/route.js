import { createWebHistory, createRouter } from "vue-router";

// Layouts
import AdminLayout from "../Layouts/AdminLayout/AdminLayout.vue";

// router Admin
import Admin from "@/views/Admin/Admin.vue";
import LoginAdmin from "@/views/LoginAdmin/LoginAdmin.vue";
import AuthLayout from "@/Layouts/AuthLayout/AuthLayout.vue";
import RegisterAdmin from "@/views/RegisterAdmin/RegisterAdmin.vue";
import AboutAdmin from "@/views/AboutAdmin/AboutAdmin.vue";
import InfoAdmin from "@/views/InfoAdmin/InfoAdmin.vue";
import EditProfileAdmin from "@/views/EditProfileAdmin/EditProfileAdmin.vue";
import Customer from "@/views/Customer/Customer.vue";
import DefaultLayout from "@/Layouts/DefaultLayout/DefaultLayout.vue";
import HistoryAdmin from "@/views/HistoryAdmin/HistoryAdmin.vue";
import AuthLayoutAdmin from "@/Layouts/AuthLayoutAdmin/AuthLayoutAdmin.vue";
// import user
import About from "@/views/User/About/About.vue";
import Home from "@/views/User/Home/Home.vue";
import Login from "@/views/User/Login/Login.vue";
import Register from "@/views/User/Register/Register.vue";
import Profile from "@/views/User/Profile/Profile.vue";
import EditProfile from "@/views/User/EditProfile/EditProfile.vue";
import Order from "@/views/User/Order/Order.vue";
const routes = [
  // router Admin
  {
    path: "/admin/home",
    component: Admin,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/login",
    component: LoginAdmin,
    meta: {
      layout: AuthLayout,
    },
  },
  {
    path: "/admin/register",
    component: RegisterAdmin,
    meta: {
      layout: AuthLayout,
    },
  },
  {
    path: "/admin/home",
    component: Admin,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/about",
    component: AboutAdmin,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/info",

    component: InfoAdmin,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/editprofile",

    component: EditProfileAdmin,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/customer",

    component: Customer,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/history",
    component: HistoryAdmin,
    meta: {
      layout: AdminLayout,
    },
  },
  //route user 
  {
    path: "/",
    component: Home,
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      layout: AuthLayout,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      layout: AuthLayout,
    },
  },
  {
    path: "/about",
    component: About,
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: "/editprofile",
    component: EditProfile,
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: "/order",
    component: Order,
    meta: {
      layout: DefaultLayout,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;