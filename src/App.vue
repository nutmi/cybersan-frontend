<template>
  <nav class="nav-bar">
    <div class="title">
      <router-link :to="{name: 'home'}" class="link">cybersan</router-link>
    </div>
    <div class="choices">
      <div>
        <router-link :to="{name: 'me'}" class="link">user</router-link>
      </div>
      <div v-if="authorized" @click="logOut">
        logout
      </div>
      <div v-else>
        <router-link :to="{name: 'login'}" class="login">login</router-link>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
  data() {
    return {
      token: ref(''),
      authorized: true
    }
  },
  mounted() {
    this.getToken()
    this.chechAuthorized()
  },
  methods: {
    chechAuthorized() {
      if (localStorage.getItem('token')) {
        this.authorized = true
      }
    },
    getToken() {
      this.token = localStorage.getItem('token')
      console.log(this.token)
  },
  logOut() {
    const token = localStorage.getItem("token");
    axios
        .post("http://127.0.0.1:8000/auth/token/logout/", null, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then((res) => {
            console.log(res.data);
            localStorage.removeItem('token')
            this.$router.push('login')
            this.authorized = false
        })
        .catch((error) => {
            console.error("Error logging out:", error);
        });
      }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #121111bd;
}

.title {
  width: 15%;
  font-size: 20px;
}

.link {
  text-decoration: none;
  color: yellow;
}

.login {
  text-decoration: none;
  color: yellow;
}
.choices {
  display: flex;
  justify-content: space-around;
  width: 40%;
  color: yellow;
}
</style>
