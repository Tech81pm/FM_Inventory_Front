<template>
     <nav class="navbar custom-navbar">
        <div class="container">
            <a class="navbar-brand">ONE STYLE INC.</a>
            <ul class="nav justify-content-end">
            <li class="nav-item">
                <router-link class="nav-link" to="/" aria-current="page">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/login" aria-current="page">Login</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/register" aria-current="page">Register</router-link>
            </li>
            </ul>
        </div>
    </nav>
</template>

<script setup>

</script>

<style scoped>
.navbar {
    background: var(--dark-alt);
}

.navbar-brand {
    color: var(--light);
}
.nav-link {
    color: var(--light);
}

</style>