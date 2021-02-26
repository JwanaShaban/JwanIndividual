<template>
    <table v-if="load" style="width:100%">
      <tr>
        <th>Title</th>
        <th>Details</th>
        <th>Tags</th>
        <th>Graph</th>
      </tr>
      <tr v-for="(subs, index) in userSubmissions" :key="index">
        <td>{{ subs.uploadTitle }}</td>
        <td>{{ subs.uploadDetails }}</td>
        <td>{{ subs.tags }}</td>
        <td><graph-creator v-bind:userSubmissions="subs" /></td>
        <td><button  class="btn btn-success" @click="deleteSelected(subs, index)">Delete</button></td>
      </tr>
    </table>
</template>
<script>
// @ is an alias to /src
import GraphCreator from "../components/GraphCreator";
import emailjs from 'emailjs-com';
import {ref} from "vue";
import {firebaseAuthentication } from "@/firebase/database";

import {
  getAllSubmissions,
  deleteUserSubmission,
} from "../firebase/database.js";
export default {

  setup(){

    const user = ref(firebaseAuthentication.currentUser.email);



    return {user}
  },

  

  data() {
    return {
      userSubmissions: [],
      load: false,
    };
  },
  components: {
    GraphCreator,
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      const userSubmissions = await getAllSubmissions();

      this.userSubmissions = userSubmissions;
      this.load = true;
    },
    deleteSelected(e, b) {
          console.log(this.user);
      if(confirm("Are you sure you want to delete? This cannot be undone!")== true){
        var templateParams = {
            email: this.user
            };
        emailjs.send("service_cswgxab","template_dbwr4bk",templateParams,"user_TfsemkgXGUUnBYOXERVQC");
        
      const selectedDoc = e.tags;
      console.log(selectedDoc);
      deleteUserSubmission(selectedDoc);
      this.removeElement(b);
      return;
      }else{
        return false;
      }
      
    },
    removeElement(b) {
      this.userSubmissions.splice(b, 1);
    },
  },
};
</script>

<style scoped>

</style>
