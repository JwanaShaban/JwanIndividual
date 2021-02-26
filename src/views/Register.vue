<template>
  <div class="Register">
  <div class="jumbotron text-center">
  <h1>Register</h1> 
  </div>
  <div class="text-center">
  <div class="container">
      <div class="row" style="margin-top:20px">
    <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
		<form role="form">
			<fieldset>
				<h2>Please Sign up</h2>
                <hr class="colorgraph">
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6">
					<div class="form-group">
                        <input type="text" name="first_name" id="first_name" class="form-control input-lg" placeholder="First Name" v-model="firstName" minlength="3" maxlength="14" autocomplete="off" required>
					</div>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6">
					<div class="form-group">
						<input type="text" name="last_name" id="last_name" class="form-control input-lg" placeholder="Last Name" v-model="surname" minlength="3" maxlength="20" required>
					</div>
				</div>
        <div class="col-xs-12 col-sm-6 col-md-6">
					<div class="form-group">
						<input type="text" name="display-name" id="display-name" class="form-control input-lg" placeholder="Display Name" v-model="displayName">
					</div>
				</div>
			</div>
			<div class="form-group">
				<input type="email" name="email" id="email" class="form-control input-lg" placeholder="Email Address*" v-model="email">
			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6">
					<div class="form-group">
						<input type="password" name="password" id="password" class="form-control input-lg" placeholder="Password*" v-model="password">
					</div>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6">
					<div class="form-group">
						<input type="password" name="password_confirmation" id="password_confirmation" class="form-control input-lg" placeholder="Confirm Password" v-model="confirmPassword">
					</div>
				</div>
			</div>
      <div v-if="errorRegistration">
      <el-button plain type="danger" disabled icon="el-icon-error"> {{ errorRegistration }}</el-button>
      </div>
			
			<hr class="colorgraph">
                <div class="col-xs-6 col-sm-6 col-md-6">
                            <el-button type="success" class="btn btn-lg btn-success btn-block" @click="register">Register</el-button>
                </div>
								
			</fieldset>
		</form>
	</div>
</div>
    </div>
    <p></p>
  </div>
  <p></p>
  </div>
</template>




<script>
// @ is an alias to /src

import {ref, watch} from "vue";
import { useRouter } from "vue-router";
import { firebaseAuthentication } from "@/firebase/database";

export default {
  name: 'Register',
  emits: ["register-clicked"],

  setup(){
    const firstName = ref("");
    const surname = ref("");
    const displayName = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const errorRegistration = ref("");

    watch(confirmPassword, () => {
      if (
        password.value !== "" &&
        confirmPassword.value !== "" &&
        password.value !== confirmPassword.value
      ){
        errorRegistration.value = "Passwords do not match!";
      } else {
        errorRegistration.value = null;
      }

    });

    const router = useRouter();

    function register(){
      const info = {
        email: email.value,
        password: password.value,
        displayName: displayName.value,
      };

      if(!errorRegistration.value) {
        firebaseAuthentication
          .createUserWithEmailAndPassword(info.email, info.password)
          .then(
            (userCredentials) => {
              return userCredentials.user 
              .updateProfile({
                displayName: info.displayName,
              })
              .then(() => {
                router.replace("login");
              });
            
            },
            (error) => {
              errorRegistration.value = error.message;
            }
            
          );
      }
    }
    return{
      firstName,
      surname,
      displayName,
      email,
      password,
      confirmPassword,
      errorRegistration,
      register
    };

  }
}
</script>





<style scoped>
   .jumbotron {
    background-color: #5f75f1;
    color: #fff;
    padding: 50px 25px;
    font-family: Montserrat, sans-serif;
  }

    .jumbotron3 {
    background-color: #121172;
    color: #fff;
    padding: 120px 25px;
    margin-top: -1rem;
    font-family: Montserrat, sans-serif;
  }


  .colorgraph {
  height: 5px;
  border-top: 0;
  background: #c4e17f;
  border-radius: 5px;
  background-image: linear-gradient(to right,#6647d8 50%, #6647d8 62.5%, #4e29d4 62.5%, #4e29d4 75%,#669ae1 5%,#669ae1 15%,#669ae1 25%,#669ae1 35%,#669ae1 45%,#669ae1 55%,#669ae1 65%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
}
</style>
