<template>

  <router-view></router-view>

  

 
</template>

<script>





export default {
  name: 'App',
  components:{
 
   
}
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
 
}
body{
  padding: 0;
  margin: 0;
}

.logo{
  margin-top: 75px;
    height: 130px;
    width: 152px;
    margin-bottom: 55px;
}
.register input, .login input, .add input, .update input{
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid green;
    border-radius: 10px;
}

.register button, .login button, .add button, .update button{
    width: 100px;
    height: 40px;
    border: 1px solid green;
    background: green;
    color: #fff;
    cursor: pointer;
    border-radius: 35px;
}

</style>
