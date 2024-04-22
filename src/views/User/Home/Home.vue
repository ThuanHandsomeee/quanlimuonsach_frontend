<template>
  <div class="containPage">
    <div class="titlePage">
      <h2>
        Welcome to
        <span class="titleWeb">Library<span class="text-dark">BOOKS</span></span>
      </h2>
    </div>
    <div class="contentPage">
      <!-- Section: Design Block -->
      <section class="">
        <!-- Jumbotron -->
        <div class="text-center text-lg-start">
          <div class="container">
            <div class="row gx-lg-5 align-items-center">
              <div class="col-lg-6 mb-5 mb-lg-0">
                <div class="introContent">
                  <h1 class="my-5 fw-bold ls-tight titleIntro">
                    "Books are a uniquely portable magic."
                    <br />
                    <span class="text-success">(Stephen King)</span>
                  </h1>
                  <p style="color: hsl(217, 10%, 50.8%)">
                    Books have the remarkable ability to transport us to different worlds, ignite our imagination, and
                    broaden our perspectives. They hold the power to inspire, educate, and entertain us, making them
                    indispensable companions on life's journey.
                  </p>

                  <router-link to="/about" class="text-decoration-none">
                    <button class="btnReadMore">Explore Now</button>
                  </router-link>
                </div>
              </div>

              <div class="col-lg-6 mb-5 mb-lg-0">
                <div class="card">
                  <div class="imageCup">
                    <img src="../../../assets/thuvien.jpg" alt="Library" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Jumbotron -->
      </section>
      <!-- Section: Design Block -->
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "./Home.scss";

.introContent {
  padding: 0 30px;
}
</style>
