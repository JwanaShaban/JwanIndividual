<template>
  <div class="home_page">
  <div class="jumbotron text-center"> 
  <h1> Welcome to Homepage </h1>
  <img v-if="user" src="@/assets/beat.png" width="272" height="80" class="image2"/>
  <p v-if="!user"> Please Log in to enter data! Also, make sure you click on “Symptoms” to be able to view the 
    symptoms of the keyword selected.</p>
    <br>
    
    <img v-if="!user" src="@/assets/beat.png" width="320" height="100" class="image"/>
    <p v-if="!user">Thank you</p>


</div> 

<div class="jumbotron4 text-left" >
  <div v-if="!user">
  <h2><b>
     What is Cardiomyopathy?</b>
  </h2>
  <br>
  <p style="color:black; font-size:20px;"><b> Cardiomyopathy is a general term for diseases of the heart muscle, 
    where the walls of the heart chambers have become stretched, thickened or stiff. 
    This affects the heart's ability to pump blood around the body.</b></p>
    <p style="color:black; font-size:16px;">The abnormal heart muscle seen in cardiomyopathy is not caused by 
      blocked arteries in the heart (coronary artery disease), high blood pressure 
      (hypertension), disease of the heart valves (valvular disease) or congenital heart disease.

    Most types of cardiomyopathy are inherited and are seen in children and younger people.</p>
    <div class="row" id="wrapper">
    <div class="column">
    <img v-if="!user" src="@/assets/Cardio.png" width="272" height="300" class="image2"/>
    </div>

    <div class="column">
    <img v-if="!user" src="@/assets/Cardio2.png" width="272" height="300" class="image2"/>
    </div>

    <div class="column">
    <img v-if="!user" src="@/assets/Cardio3.png" width="272" height="270" class="image2"/>
    </div>

    </div>
   <br>
     <h2><b>
     Treating cardiomyopathy</b>
  </h2>
  <br>
    <p style="color:black; font-size:16px;">
There's usually no cure for cardiomyopathy, but the treatments can be effective at
 controlling symptoms and preventing complications. Some types of cardiomyopathy have specific 
 treatments and early diagnosis is very important.
Not everyone with cardiomyopathy will need treatment. 
Some people only have a mild form of the condition they can control after making 
a few lifestyle changes.
    </p>

  </div>
<div class="tabs">
  <h2 v-if="user">Hi, {{user.displayName}}, please enter data</h2> 
  <h2 v-if="user"> <user-upload-data/> </h2>
</div>
</div>  
   
<br>

  <div class="jumbotron2 text-center">
  <h1>Search keywords </h1> 
  <p>Please select one keyword to search</p> 
   <div class="input-container" >
      <select v-model="selected">
        <option disabled value="">Please select one </option>
        <option>TNNT</option>
        <option>MYH</option>
        <option>MYBPC3</option>
        <option>TPM1</option>
      </select>
      <span>Selected: {{selected}}</span>
      <button class="btn btn-success" Style="color:white; background-color:navy;" @click="populateDiseaseList()" >SEARCH </button>
    </div>
      <SearchList  v-if="results && internalResults && somethingEntered == true"
      :results="results"
      :internalResults="internalResults"/>
  

</div>
  </div>
</template>

<script>
// @ is an alias to /src
import {ref} from "vue";
import {firebaseAuthentication, firestoreQuery } from "@/firebase/database";
import UserUploadData from '../components/UserUploadData';
import SearchList from '../components/SearchList';




export default {
  name: 'Home',
  components: {
    UserUploadData,
    SearchList
  },

  setup(){

    const user = ref(firebaseAuthentication.currentUser);
   

   
    
  
    firebaseAuthentication.onAuthStateChanged(user => {
      user.value = user;
    });


    return {user};
  },
  data() {
    return{
      results: undefined,
      internalResults: undefined,
      selected: '',
      somethingEntered: false,
      geneType: '',
      diseaseList: '',
      disease_base_url: "https://hpo.jax.org/api/hpo/disease",
      error: ''
    }
  },
  methods: {
   async populateDiseaseList() {
     this.somethingEntered = false;
      if (this.selected === 'TNNT') {
      this.geneType = 'OMIM:601494';
      }
      else if (this.selected === 'MYH') {
      this.geneType = 'OMIM:192600';
      }
      else if (this.selected === 'MYBPC3'){
       this.geneType = 'OMIM:115197';
      }
      else{
        this.geneType ='OMIM:115196'
      }
      const disease_list_url = this.disease_base_url + "/" +this.geneType
      try {
        let disease_data = await fetch(disease_list_url);
        if (!disease_data.ok) {
          throw Error("No results found");
        }
        this.diseaseList = await disease_data.json();
        this.results = this.diseaseList
        this.internalResults = this.selected
        this.checkInternal(this.internalResults);
        
        console.log("it didnt catch");
      } catch (error) {
        console.log("it caught");
      }
    },
    async checkInternal(selected){
      const queryResult = await firestoreQuery(selected);
      this.internalResults = queryResult;
      this.somethingEntered = true
    }
  }


}

</script>


<style scoped>
  .jumbotron {
    background-color: #5f75f1;
    color: #fff;
    padding: 60px 25px;
    font-family: Montserrat, sans-serif;
    font-size: 22px;
  }

    .jumbotron4 {
    background-color: #e2ebfd;
    color: #fff;
    padding: 60px 25px;
    font-family: Montserrat, sans-serif;
  }

    .jumbotron2 {
    background-color: #e2ebfd;
    color: black;
    padding: 100px 25px;
    font-family: Montserrat, sans-serif;
  }

  .image{
  margin-top: -3rem;
}
.image2{
  margin-top: -1rem;
}
  .drop
  {
    background-color: #ffffff;
    color: rgb(0, 0, 0);
    padding: 20px 25px;
    font-family: Montserrat, sans-serif;
    font-size: 20px;
  }

  .tabs
  {
    display: inline-block;
    margin-left: 35%;
    margin-right: auto;
    text-align: left;
    padding: 12px 20px;
    border-radius: 4px;
    color: black;
 

  }

.tabs-btn
{
  background-color: blue;
}


.column {
  float: left;
  width: 33.33%;
  padding: 5px;
}

/* Clear floats after image containers */
.row::after {
  content: "";
  clear: both;
  display: table;
}



#wrapper {
    margin-left:auto;
    margin-right:auto;
    width:960px;
}
</style>
