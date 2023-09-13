<template>
    <div class="login">
        <img class="logo" style="margin-top: 75px;height: 130px;width: 152px;" src="../assets/task2.png" alt="">
        <h2 style="margin-top:30px;margin-bottom: 36px">Login</h2>


        <div class="register">


            <input type="email" v-model="email" placeholder=" Enter Email ">
            <input type="password" v-model="password" placeholder=" Enter Password ">
            <button v-on:click="login">Login</button>
            <br><br>
            <p>
                <router-link to="/sign-up" style="color: rgb(19, 92, 156); font-size: 18px;">Sign Up</router-link>
            </p>


        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'LoginComp',
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        async login() {
            let result = await axios.get(`http://localhost:5000/urs?email=${this.email}&password=${this.password}`)

            if (result.status == 200 && result.data.length > 0) {

             

                localStorage.setItem("user-info", JSON.stringify(result.data[0]))
                this.$router.push({ name: 'HomeComp'  })
            }
            console.warn(result)

            Swal.fire({
                title: 'Login',
                text: 'Login Successfully!',
                icon: 'Success',
                confirmButtonText: 'Ok'
            });
            this.$router.push({ name: 'HomeComp' })
           
        },
        
      
    }, 
    
    mounted() {
        let user = localStorage.getItem('user-info');
        if (user) {
            this.$router.push({ name: 'HomeComp' })
        }
    }
}
</script>

<style></style>