<template>
  <div class="app">
    <div class="content">
      <MyHeader/>
      <main>
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script setup>
import MyHeader from "./components/base/MyHeader.vue";
</script>


<style lang="scss">
:root {
  --primary: #1A1A1D;
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

.app {
  display: flex;

  .content {
    display: flex;
    flex-direction: column;
    flex: 1; 

    Appbar {
      flex-shrink: 0; 
    }

  }
  .laman{
    padding: 2rem;
  }
}
</style>