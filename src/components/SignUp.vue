<template>
    <div class="login">
        <img class="logo" style="margin-top: 75px;height: 130px;width: 152px;" src="../assets/task2.png" alt="">
        <h2 style="margin-top:30px;margin-bottom: 36px;">SignUp</h2>


        <div class="register">

            <input type="text" v-model="name" placeholder=" Enter Name ">
            <input type="email" v-model="email" placeholder=" Enter Email ">
            <input type="password" v-model="password" placeholder=" Enter Password ">
            <button v-on:click="signUp">Sign Up</button>
            <br><br>
            <p>
                <router-link to="/login" style="color: rgb(19, 92, 156); font-size: 18px;">Login</router-link>
            </p>


        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    name: 'SignUp',
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        async signUp() {
            console.warn("signUp", this.name, this.email, this.password)
            let result = await axios.post("http://localhost:5000/urs", {
                name: this.name,
                email: this.email,
                password: this.password
            });

            console.warn(result);
            if (result.status == 201) {

                localStorage.setItem("user-info", JSON.stringify(result.data))
              
                console.log(result.status)
            }
            this.$router.push({ name: 'LoginComp' });

            Swal.fire({
                title: 'Sign Up',
                text: 'Sign Up Successfully!',
                icon: 'Success',
                confirmButtonText: 'Ok'
            });
          
        }


    },
    mounted() {
        let user = localStorage.getItem('user-info');
        if (user) {
            // this.$router.push({ name: 'LoginComp' })
        }
    }
}
</script>

<style>
.logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 8%;
    margin-top: 5%;

}

.register input {
    width: 310px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid green;
    border-radius: 10px;
}

.register button {
    width: 100px;
    height: 40px;
    border: 1px solid green;
    background: green;
    color: #fff;
    cursor: pointer;
    border-radius: 35px;

}
</style>