<template>
<body>
    <div>
        <input type="text" v-model="username" placeholder="enter name">
        <input type="password" v-model="password" placeholder="enter password">
        <button v-on:click="singUp">sing up</button>
    </div>
    <h1>or</h1>
    <router-link to="/login">log in </router-link>
</body>    
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios'
import router from '@/router'

export default {
    name: "SingUp",
    data(){
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        async singUp() {
            try {
                await axios.post('http://127.0.0.1:8000/auth/users/', {
                username: this.username,
                password: this.password
                });

                console.log('Redirecting to /');
                this.$router.push({name: "login"})
                }
                catch (error) {
                console.log(error.response.data)
            }
        }
    }
}
</script>



<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
</style>