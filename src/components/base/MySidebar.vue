<template>
    <aside :class="{ 'is-expanded': is_expanded }">
      <div class="menu-toggle-wrap">
        <button class="menu-toggle" @click="ToggleMenu" style="background-color: var(--dark); border: none;">
          <span class="material-icons">
          menu
          </span>
        </button>
      </div>
  
      <div class="menu">
        <router-link class="button" to="/">
          <span class="material-icons">dashboard</span>
          <span class="text">Dashboard</span>
        </router-link>
        <router-link class="button" to="/assets">
          <span class="material-icons">dashboard</span>
          <span class="text">Assets</span>
        </router-link>
        <router-link class="button" to="/purchase">
          <span class="material-icons">dashboard</span>
          <span class="text">Purchase</span>
        </router-link>
        <router-link class="button" to="/reports">
          <span class="material-icons">dashboard</span>
          <span class="text">Reports</span>
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
          color: var(--light);
          transition: 0.2s ease-out;
        }
  
        &:hover {
          .material-icons {
            color: var(--primary);
            transform: translateX(0.2rem);
          }
        }
      }
    }
  
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
          color: var(--light);
          transition: 0.2s ease-out;
        }
  
        .text {
          color: var(--light);
          transition: 0.2s ease-out;
        }
  
        &:hover,
        &.router-link-exact-active {
          background-color: var(--dark-alt);
  
          .material-icons,
          .text {
            color: var(--primary);
          }
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
  
      .button .text {
        opacity: 10;
      }
  
      .button {
        .material-icons {
          margin-right: 1rem;
        }
      }
    }
  
    @media (max-width: 768px) {

      position: fixed;
      z-index: 99;
    }
  }
  </style>