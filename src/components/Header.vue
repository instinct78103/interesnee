<template>
  <header id="masthead" class="site-header sticky">
    <div class="site-branding-container">
      <div class="site-branding">
        <div class="site-logo">
          <router-link to="/">
            <picture class="logo">
              <source srcset="" type="image/webp">
              <img srcset="https://blog.interesnee.ru/wp-content/themes/interesnee/project/assets/images/logo.svg" alt="Очень Интересно" decoding="async">
            </picture>
          </router-link>
        </div>
        <nav id="site-navigation" class="main-navigation" aria-label="Top Menu">
          <div class="menu-top-menu-container">
            <ul id="menu-top-menu" class="main-menu">
              <li class="menu-item">
                <router-link to="/camp">Devops camp</router-link>
              </li>
              <li class="menu-item">
                <router-link to="/projects">Проекты</router-link>
              </li>
              <li class="menu-item">
                <router-link to="/join">Присоединяйся к нам</router-link>
              </li>
              <li class="menu-item">
                <router-link to="/team">Команда</router-link>
              </li>
              <li class="menu-item"><a href="#">Блог</a></li>
            </ul>
          </div>
          <a class="mobile-menu-toggle" href="#">
            <i class="lines-button">
              <i class="lines"></i>
              <i class="lines"></i>
              <i class="lines"></i>
            </i>
          </a></nav>
      </div>
    </div>
  </header>
</template>

<style lang="scss">

</style>