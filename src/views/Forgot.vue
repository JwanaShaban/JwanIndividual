<template>
  <div class="login">
    <div class="jumbotron text-center">
  <h1>Forgot Password?</h1> 
  </div>
  <div class="text-center">
  <div class="container">
      <div class="row" style="margin-top:20px">
    <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
		<form>
			<fieldset>
				<h2>Please Enter Email</h2>
				<hr class="colorgraph">
				<div class="form-group">
                    <input type="email" name="email" id="email" class="form-control input-lg" placeholder="Email Address" v-model="email">
				</div>

				<hr class="colorgraph">
				<div class="row">
					<div class="col-xs-6 col-sm-6 col-md-6">
                        <button class="submit btn btn-lg btn-success btn-block" @click="sendEmail">
                          Send reset link
                        </button>
					</div>
				</div>
			</fieldset>
		</form>
	</div>
</div>
    </div>

  </div>
  </div>
</template>


<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      error: null,
      emailSending: false,
    };
  },
  methods: {
    sendEmail() {
      this.emailSending = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.emailSending = false;
        })
    },
  },
};
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

  .container{
    width:80%;
  }
  .h2{
    color: white !important;
  }

  .colorgraph {
  height: 5px;
  border-top: 0;
  background: #c4e17f;
  border-radius: 5px;
  background-image: linear-gradient(to right,#6647d8 50%, #6647d8 62.5%, #4e29d4 62.5%, #4e29d4 75%,#669ae1 5%,#669ae1 15%,#669ae1 25%,#669ae1 35%,#669ae1 45%,#669ae1 55%,#669ae1 65%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
}

</style>
