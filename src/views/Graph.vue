<template>
<div>
  <div class="jumbotron text-left">
    <h1> Uploads </h1>
     <h2> Welcome to the Graph page</h2>

<p>To view graphs, please make sure that you have uploaded a CSV file from home page attached with a title, description and tags. Once you have uploaded a file, graphs will appear on this page. </p>

<p>You can also delete your uploads on this page after uploading files. A confirmation email will be sent once you upload or delete a file. </p>

Thank you 
  </div>

 
  
  <div v-if="user">   
      <div class="graph">   
        <UploadList />  
      </div>
  </div>
  
</div>
</template>
<script>
// @ is an alias to /src
import {ref} from "vue";
import {firebaseAuthentication } from "@/firebase/database";
import UploadList from '../components/UploadList'
export default {
  name: 'Home',
  components: {
    UploadList
  },

  setup(){

    const user = ref(firebaseAuthentication.currentUser);
   

  
    firebaseAuthentication.onAuthStateChanged(user => {
      user.value = user;
    });


    return {user};
  }


}

</script>



<style scoped>
  .jumbotron {
    background-color: #5f75f1;
    color: #fff;
    padding: 100px 25px;
    font-family: Montserrat, sans-serif;
    font-weight: bold;
  }

  .graph{
    background-color:#9bacf5;
    color: #fff;
    font-family: Montserrat, sans-serif;
    width: 90%;
    display: inline-block;
    margin-left: 5%;
    border-radius: 25px;
    padding: 20px;
    width: 90%;
    border-style: solid;
  border-color: #121172;
  }
</style>

