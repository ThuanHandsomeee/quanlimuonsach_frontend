<template>
    <div class="containPage">
      <section>
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-xl-10">
              <div class="card loginForm">
                <div class="row g-0">
                  <div class="col-md-6 col-lg-6 d-flex align-items-center">
                    <div class="card-body p-4 p-lg-5 text-black">
                      <form @submit.prevent="login">
                        <div class="d-flex align-items-center mb-3 pb-1">
                          <div class="logo">
                            <img src="../../assets/coffee-cup.png" alt="" />
                            <span class="titleWeb"
                              >Book<span class="text-dark">Future</span></span
                            >
                          </div>
                        </div>
  
                        <div class="fw-normal pb-2 desLogin">
                          Đăng nhập với quyền Admin
                        </div>
  
                        <div class="group">
                          <label for="phone"
                            ><i class="fa-solid fa-phone iconForm"></i
                          ></label>
                          <input
                            type="text"
                            id="phone"
                            class="groupInput"
                            v-model="phone"
                            name="phone"
                            autocomplete="off"
                            placeholder="Nhập số điện thoại"
                            required
                            maxlength="10"
                            minlength="9"
                          />
                        </div>
  
                        <div class="group2">
                          <label for="password"
                            ><i class="fa-solid fa-lock iconForm"></i
                          ></label>
                          <input
                            :type="showPassword ? 'text' : 'password'"
                            v-model="password"
                            name="password"
                            id="password"
                            class="groupInput"
                            autocomplete="off"
                            placeholder="Nhập mật khẩu"
                            required
                          />
                          <div @click="toggleShowPassword" class="iconPassword">
                            <div v-if="showPassword">
                              <i class="fa-solid fa-eye"></i>
                            </div>
                            <div v-else>
                              <i class="fa-solid fa-eye-slash"></i>
                            </div>
                          </div>
                        </div>
                        <div class="pt-1 mb-4">
                          <button class="btnPay">Login</button>
                        </div>
  
                        <a class="small text-muted" href="#!">Quên mật khẩu</a>
                        <p class="mb-1 pb-lg-2" style="color: #393f81">
                          Đăng ký tài khoản 
                          <router-link to="/admin/register" class="button">
                            <strong style="color: #393f81">Tại đây</strong>
                          </router-link>
                        </p>
                      </form>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-6 d-none d-md-block m-auto">
                    <img
                      src="https://i.pinimg.com/564x/e1/2b/5b/e12b5b0bb42756d3dcc499f498a1fa1f.jpg"
                      alt="login form"
                      class="imageLogin"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>
  
  <script setup>
  import axios from "axios";
  import { ref } from "vue";
  import { toast } from "vue3-toastify";
  import { useRouter } from "vue-router";
  import { useUserStore } from "../../stores/userStore";
  const userStore = useUserStore();
  const router = useRouter();
  const phone = ref("");
  const password = ref("");
  const showPassword = ref(false);
  const toggleShowPassword = () => {
    showPassword.value = !showPassword.value;
  };
  const login = () => {
    const formData = {
      phone: phone.value,
      password: password.value,
    };
    axios
      .post("http://localhost:3000/authentication/login/staff", formData)
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          const ID_User = res.data.data._id;
          const Username = res.data.data.HoTenNv;
          const Avatar = res.data.data.Avatar;
          const Position = res.data.data.ChucVu;
          const Address = res.data.data.DiaChi;
          const isLogin = true;
          localStorage.setItem("ID_User", ID_User);
          localStorage.setItem("Username", Username);
          localStorage.setItem("Avatar", Avatar);
          localStorage.setItem("Position", Position);
          localStorage.setItem("Address", Address);
          localStorage.setItem("isLogin", isLogin);
          router.push("/admin/home");
        }
      });
  };
  </script>
  
  <style lang="scss" scoped>
  @import "./LoginAdmin.scss";
  </style>