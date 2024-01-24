<template>
    <body>
        <div v-if="userinfo">

            <div class="usename">
                {{ userinfo.username }}
            </div>

            <div class="description">
                {{  userinfo.description }}
            </div>

            <div class="achivments">
                achivments:
                <ul>
                    <li v-for="(achievement, id) in userinfo.achievements" :key="id">
                        {{ achievement.achivment.name }} - {{ achievement.achivment.description }}
                    </li>
                </ul>
            </div>

            <div>
                <router-link :to="{name: 'updatepassword'}">update password</router-link>
            </div>

        </div>

        <div v-else>
            anonymous
        </div>
        
    </body>
</template>

<script>
import axios from 'axios';


export default {
    mounted() {
        this.userInfo()
    },
    data() {
        return {
            userinfo: []
        }
    },
    methods: {
        userInfo() {
            const token = localStorage.getItem('token')
            if (token) {
                axios.get('http://localhost:8000/auth/users/me/', {
                headers: {
                    Authorization: 'Token ' + token
                }
            })
            .then((res) => {
                this.userinfo = res.data
            })
            } else {
                this.userinfo = ''
            }
        }
    }
}
</script>
