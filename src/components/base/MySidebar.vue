<template>
    <aside :class="{ 'is-expanded': is_expanded }">
      <div class="menu-toggle-wrap">
        <button class="menu-toggle" @click="ToggleMenu">
        </button>
      </div>
  
      <div class="menu">
        <router-link class="button" to="/">

          <span class="text">Dashboard</span>
        </router-link>
        <router-link class="button" to="/assets">

          <span class="text">Assets</span>
        </router-link>
      </div>
    </aside>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const is_expanded = ref(true);
  
  const ToggleMenu = () => {
    is_expanded.value = !is_expanded.value;
  };
  </script>
  
  <style lang="scss" scoped>
  aside {
    display: flex;
    flex-direction: column;
    width: calc(2rem + 32px);
    min-height: 100vh;
    overflow: hidden;
    padding: 1rem;
  
    background-color: var(--dark);
    color: var(--light);
    transition: 0.2s ease-out;
  
    .menu-toggle-wrap {
      display: flex;
      justify-content: flex-end;
      transition: 0.2s ease-out;
      margin-bottom: 2rem;
  
      .menu-toggle {
        transition: 0.2s ease-out;
  
        .material-icons {
          font-size: 2rem;
          color: var(--dark-alt);
          transition: 0.2s ease-out;
        }
  
        &:hover {
          .material-icons {
            color: var(--dark);
            transform: translateX(0.2rem);
          }
        }
      }
    }
  
    h5,
    .button .text {
      opacity: 0;
      transition: 0.3s ease-out;
    }
  
    .menu {
      margin: 0 -1rem;
  
      .button {
        display: flex;
        align-items: center;
        text-decoration: none;
        padding: 0.5rem 1rem;
        transition: 0.2s ease-out;
  
        .material-icons {
          font-size: 2rem;

          transition: 0.2s ease-out;
        }
  
        .text {
          color: var(--light);
          transition: 0.2s ease-out;
        }
  
        &:hover,
        &.router-link-exact-active {
          background-color: var(--dark-alt);
  
        }
  
        &.router-link-exact-active {
          border-right: 5px solid var(--primary);
        }
      }
  
    }
  
    &.is-expanded {
      width: 17%;
      min-width: 200px;
  
      .menu-toggle-wrap {
        top: -3rem;
  
        .menu-toggle {
          transform: rotate(-180deg);
        }
      }
  
      h5,
      .button .text {
        opacity: 1;
      }
  

    }
  
    @media (max-width: 768px) {

      position: fixed;
      z-index: 99;
    }
  }
  </style>
  