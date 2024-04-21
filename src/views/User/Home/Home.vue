<template>
    <div class="containPage">
      <div class="titlePage">
        <h2>
          Welcome to
          <span class="titleWeb">F<span class="text-dark">BOOKS</span></span>
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
                  <h1 class="my-5 fw-bold ls-tight titleIntro">
                    There is no friend as loyal as a
                    <span class="titleWeb"
                      >Book.<span class="text-dark"></span
                    ></span>
                    <br />
                    <span class="text-primary">(Ernest Hemingway)</span>
                  </h1>
                  <p style="color: hsl(217, 10%, 50.8%)">
                    Books are not only pages filled with knowledge, but also doors
                    opening to new worlds, endless sources of inspiration, and
                    loyal companions in the loneliest moments of life. Within each
                    page, we discover not only the culture, history, and
                    philosophy of humanity but also encounter wonders, adventures,
                    and valuable lessons for ourselves.
                  </p>
  
                  <router-link to="/about" class="text-decoration-none">
                    <button class="btnReadMore">Order now</button>
                  </router-link>
                </div>
  
                <div class="col-lg-6 mb-5 mb-lg-0">
                  <div class="card">
                    <div class="imageCup">
                      <img src="../../../assets/bg-home.jpg" alt="" />
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
  </style>