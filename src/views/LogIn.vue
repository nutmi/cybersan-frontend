<template>
<body>
    <h1>login page</h1>
    <div>
        <input type="text" v-model="username" placeholder="enter name">
        <input type="password" v-model="password" placeholder="enter password">
        <button v-on:click="Login">login</button>
    </div>
</body>    
</template>

<script>
import axios from 'axios'

export default {
    name: "Login",
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        Login() {
            axios.post('http://127.0.0.1:8000/auth/token/login', {
                username: this.username,
                password: this.password
            }).
            then(function(response) {
                console.log(response.data.auth_token)
                const token = response.data.auth_token
                localStorage.setItem("token", token)
            })
        }
    }
}
</script>



<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
</style>