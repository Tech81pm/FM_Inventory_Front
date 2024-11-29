<template>
  <div class="app">
    <MySidebar/>
  <form @submit.prevent="login()">
    <main class="form-signin">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    <div class="form-floating">
      <input type="text" 
      v-model="this.log.username"
      class="form-control" id="floatingInput">
      <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating">
      <input type="password" 
      v-model="this.log.password"
      class="form-control" id="floatingPassword">
      <label for="floatingPassword">Password</label>
    </div>
    <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
    </main>
  </form>
</div>
</template>
<script setup>
import MySidebar from "../components/base/MySidebar.vue";
</script>
<script>
import { toast } from 'vue3-toastify';
export default {
  data() {
    return {
      base_url: process.env.VUE_APP_BASE_URL,
      log: {
        username: '',
        password: ''
      }
    };
  },//data() bracket

  methods: {
  async login() {
  try {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), 5000) 
    );

    const response = await toast.promise(
      Promise.race([  
        fetch(`${this.base_url}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.log),
          credentials: 'include'
        }),
        timeout
      ]),
      {
        pending: 'Logging in...',
        error: 'Login failed',
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    console.log('Login successful:', data);
    toast.success(`Logged in as ${this.log.username}`, {
      autoClose: 2000
    });

  } catch (error) {
    console.error('Login error:', error.message);
    // This will show a toast on login failure
    toast.error('Login failed: ' + error.message, {
      autoClose: 2000
    });
  }finally{
    setTimeout(() => {
      toast.clearAll();
    }, 5000);
  }
}

}//method bracket

}; //export bracket

</script>


<style lang="scss" scoped>

.form-signin {
  max-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>