<template>
    
<div class="profile">
  <i class="bi bi-backspace-fill" style="margin-left:38%;margin-top: 5px;color: lightgreen;font-size: 32px;" @click="backHome()"></i>
  
    <h2 style="margin-bottom: 2%;font-size: -webkit-xxx-large;color: lightgreen;">Profile </h2>
   
    
    <img class="logo" src="../assets/Picture.png" alt="">

    <div class="update">
      <input type="text" v-model="userInfo.name" />
      <input type="email" v-model="userInfo.email" />
      <input type="password" v-model="userInfo.password" />
      <button @click="updateProfile">Update</button>
    </div>
</div>


</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';


    export default {
        name : 'ProfileComp',
        data(){
            return {
                userInfo: JSON.parse(localStorage.getItem('user-info')) || { id: null, name: '', email: '', password: '' }
              
             };
        },
        components:{
          
        },



        
        methods:{
            async updateProfile() {
      try {
        const userId = this.userInfo.id;
        if (userId === null) {
          throw new Error('User ID is not defined');
        }

        const result = await axios.put(`http://localhost:5000/urs/${userId}`, {
          name: this.userInfo.name,
          email: this.userInfo.email,
          password: this.userInfo.password
        });

        if (result.status === 200) {
          localStorage.setItem('user-info', JSON.stringify(this.userInfo));
          Swal.fire({
             title: 'Updated!',
             text: 'Task Updated successfully!',
             icon: 'success',
             confirmButtonText: 'Ok'
      });
      this.$router.push({ name: 'HomeComp' });
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        Swal.fire({
             title: 'Failed',
             text: 'Failed to updated the Profile!',
             icon: 'danger',
             confirmButtonText: 'Ok'
      });
      }
    },

    backHome(){
      this.$router.push('./')
    }

        }
    }
</script>

<style>

.profile{
    margin-top: 5%;
    
}
.logo{
    margin-top: 10px;
    width: 135px;
}

</style>











