<template>
  <div class="app">
    <MyHeader/>
    <LoginPage/>
    <MyHome/>
  </div>
</template>

<script setup>
import MyHome from "./views/MyHome.vue";
import MyHeader from "./components/base/MyHeader.vue";
import LoginPage from "./views/LoginPage.vue";
</script>


<style lang="scss">
:root {
  --primary: #9504b2;
  --primary-alt: #3e17a5;
  --dark: #837d87;
  --dark-alt: #645e69;
  --light: #e9e6f3;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira Sans', sans-serif;
}

body {
  background: var(--light);
}

</style>