<template>
  <div>
    <nav class="navbar fixed-top bg-body-tertiary">
      <div class="container-fluid" style="background-color: black;">
        <a class="navbar-brand" href="#">
          <p style="font-size: 25px;color: #ffdb71;padding-top: 10px;"><strong>Task Management Application</strong></p>
        </a>
        <i class="bi bi-share-fill" style="color: #ffdb71;margin-left:69%; font-size:  1.5vw;" @click="shareTask()"></i>
        <i style="margin: auto; color: #ffdb71; margin-right: 16px;" class="bi bi-person-circle fa-3x" @click="profile()"></i>
 
       
     
        

        <button style="color: black; background-color: #ffdb71;" class="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
          aria-label="Toggle navigation">
          <span style=" border-color:black ;" class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a style="font-size: 20px;font-weight: bold; color: #ffdb71;" class="nav-link" aria-current="page" href="#">Home</a>
            <router-link to="/taskForm" style="font-size: 20px;color: #ffdb71;font-weight: bold;" class="nav-link" href="#">Add Tasks</router-link>
        
            <a style="font-size: 20px;color: #ffdb71;font-weight: bold;margin-bottom: 3px;" class="nav-link" v-on:click="logout" href="#">Logout</a>

          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HeaderComp',
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: 'LoginComp' })
    },
    profile(){
      this.$router.push('/profile')
  },
  shareTask(){
    this.$router.push('/shareTasks')
  }
 
}
}
</script>


<style>

/* .navbar-nav a {
    font-size: 20px;
    color:aqua; 
    
    
  } */

 

  .navbar-nav a:hover {
    text-decoration: underline; /* You can adjust this to change the hover effect */
    color: #ff9900; /* You can adjust this to change the hover color */
  }


</style>