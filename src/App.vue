<template>

<div>
   <title>Cardiomyopathy</title>
 
<!--navbar section-->
<body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="60">
<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="#myPage"><img src="./assets/Web_logo_3.png"></a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav navbar-right">
        <!--link to each view through routing -->
        <div v-if="!user">
          <ul class="nav navbar-nav navbar-right">
          <li><router-link to="/home">HOME</router-link></li>
        
          <li><router-link to="/graph">GRAPH</router-link></li>
          <li><router-link to="/contact">HELP</router-link></li>
          <li class="collapse navbar-collapse nav navbar-nav navbar-right" id="hide myNavbar"><router-link to="/login">Login/Register</router-link></li>
        </ul>
        </div>
      <div v-else>
        <ul class="nav navbar-nav navbar-right">
          <li><router-link to="/home">HOME</router-link></li>
      
          <li><router-link to="/graph">GRAPH</router-link></li>
          <li><router-link to="/contact">HELP</router-link></li> 
          <li> <a class='click'  @click="logout">Logout</a> </li>
        </ul>
      </div>
      
        
      </ul>
    </div>
  </div>
</nav>


</body>

<router-view/>
</div>

</template>

<script>
import {ref} from "vue";
import { firebaseAuthentication } from "@/firebase/database";
import { useRouter } from "vue-router";
export default {
  setup(){
    const user = ref(firebaseAuthentication.currentUser);
    firebaseAuthentication.onAuthStateChanged(thisUser => {
      user.value = thisUser;
    });
    console.log(user.value)
    const router = useRouter();
    const logout = async () => {
      await firebaseAuthentication.signOut()
          user.value= null;
          router.push("login");// Redirects you to login page 
        
      
    }
    return {user, logout}
  }
  
  
}
</script>



<style>
body {
    font: 400 15px Lato, sans-serif;
    line-height: 1.8;
    color: #818181;
  }
  h2 {
    font-size: 24px;
    text-transform: uppercase;
    color: #303030;
    font-weight: 600;
    margin-bottom: 30px;
  }
  h4 {
    font-size: 19px;
    line-height: 1.375em;
    color: #303030;
    font-weight: 400;
    margin-bottom: 30px;
  }  
  .jumbotron {
    background-color: #5f75f1;
    color: #fff;
    padding: 100px 25px;
    font-family: Montserrat, sans-serif;
  }
  .container-fluid {
    padding: 60px 50px;
  }
  .container img{
    height: 45px;
    width: 95px;
    margin-top: -1rem;
  }
  .thumbnail {
    padding: 0 0 15px 0;
    border: none;
    border-radius: 0;
  }
  .thumbnail img {
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
  }
  .item h4 {
    font-size: 19px;
    line-height: 1.375em;
    font-weight: 400;
    font-style: italic;
    margin: 70px 0;
  }
  .item span {
    font-style: normal;
  }
 
  .panel:hover {
    box-shadow: 5px 0px 40px rgba(0,0,0, .2);
  }
 
  .panel-footer {
    background-color: white !important;
  }
  .panel-footer h3 {
    font-size: 32px;
  }
  .navbar {
    margin-bottom: 0;
    background-color: #121172;
    z-index: 9999;
    border: 0;
    font-size: 12px !important;
    line-height: 1.42857143 !important;
    letter-spacing: 4px;
    border-radius: 0;
    font-family: Montserrat, sans-serif;
  }
  .navbar li a, .navbar .navbar-brand {
    color: #fff !important;
  }
  .navbar-nav li a:hover, .navbar-nav li.active a {
    color: #160d4d !important;
    background-color: #fff !important;
  }
  .navbar-default .navbar-toggle {
    border-color: transparent;
    color: #fff !important;
  }
  .slideanim {visibility:hidden;}
  .slide {
    animation-name: slide;
    -webkit-animation-name: slide;
    animation-duration: 1s;
    -webkit-animation-duration: 1s;
    visibility: visible;
  }
  @keyframes slide {
    0% {
      opacity: 0;
      transform: translateY(70%);
    } 
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @-webkit-keyframes slide {
    0% {
      opacity: 0;
      -webkit-transform: translateY(70%);
    } 
    100% {
      opacity: 1;
      -webkit-transform: translateY(0%);
    }
  }
  @media screen and (max-width: 768px) {
    .col-sm-4 {
      text-align: center;
      margin: 25px 0;
    }
    .btn-lg {
      width: 100%;
      margin-bottom: 35px;
    }
  }
  @media screen and (max-width: 480px) {
    .logo {
      font-size: 150px;
    }
  }
</style>