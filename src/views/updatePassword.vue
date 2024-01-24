<template>
    <form>
        <div class="form-group">
        <label for="exampleInputEmail1">current password</label>
        <input type="password" v-model="current_password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="enter current password">
        </div>
        <div class="form-group">
        <label for="exampleInputPassword1">new password</label>
        <input type="password" v-model="new_password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <div class="form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script>
import axios from 'axios';
export default {
    name: "SingUp",
    data(){
        return {
            current_password: "", 
            new_password: "",
        }
    },
    methods: {
        updatePassword() {
        axios.post(
          'http://127.0.0.1:8000/auth/users/set_password/',
          {
            new_password: this.new_password,
            current_password: this.current_password
          },
        )
        .then((res) => {
          console.log(res.data);
          this.$router.push({path:'/me'})
          
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
        }
    }
}
</script>



<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
</style>