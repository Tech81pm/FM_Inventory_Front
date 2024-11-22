<template>
     <nav class="navbar custom-navbar">
        <div class="container">
            <a class="navbar-brand">ONE STYLE INC.</a>
            <ul class="nav justify-content-end">
            <li class="nav-item">
                <router-link class="btn btn-primary"
                to="/login"
                 type="button"
                 data-bs-toggle="offcanvas"
                 data-bs-target="#loginModal"
                 aria-controls="offcanvasRight"
                 >
                Login
                </router-link>

            </li>
            </ul>
        </div>
        <LoginPage />
    </nav>
</template>

<script setup>
import LoginPage from "@/views/LoginPage.vue";
</script>

<style scoped>
.navbar {
    background: var(--primary);
}
</style>