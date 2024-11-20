<template>
  <div :class="$style.root">
    <h1>404</h1>
    <strong>Страница не найдена</strong>
  </div>
</template>

<style lang="scss" module scoped>
.root {
  background: url('/static/back-image.png') no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: clamp(26px, 6vw, 40px);
  padding-inline: 20px;
  text-align: center;
  text-wrap: balance;
  flex-grow: 1;

  > * {
    color: #fff;
  }
}

h1 {
  font-size: 2em;
  text-align: center;
}
</style>