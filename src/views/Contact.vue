<template>
  <div class="contact">


<header>
  <h2></h2>
</header>

<section>
  <nav>
    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </nav>
  
  <article>
        <h1>Help page</h1>
    <h2>How to navigate through the web:</h2>
      <p>On top of the page, select any tab to access page content for example, 
      click “Search” to open the page which will allow you to search.
      <br></p>
      <h2>To register: </h2>
      <ul>
        <li>Click on “Register”</li>
        <li>Input your personal email, password and click register.</li>
        <li>Click on "Register"</li>
      </ul> 
     <br>
     <h2>Logging in/out:</h2>
    <ul>
        <li>To login, please input your email and password which are previously used to register an 
          account. </li>
        <li>You can log out any time by pressing “Log out” from the tab in the top right side. </li>
    </ul> 
    <br>
    <h2>Forgot your password? </h2>
    <p>If you forgot the password, you can reset it by email, 
      a link will be provided via email to help you reset your password. </p>
      <br>
      <h2>Input experimental data: </h2>
      <ul>
        <li>To upload a file it must be in CSV format and contains two columns only, 
          otherwise it will not be uploaded.</li>
          <li>Please make sure to add a title for the submission and tags then press submit.</li>
      </ul>
      <br>
      <h2>Searching:</h2>
      <ul>
        <li>Select the search tab from the menu at the top of the page. </li>
        <li>To search, please choose one of the keywords from the dropdown menu. </li>
        <li>Information will be displayed in order, feel free to choose a different keyword the web page will 
          automatically be updated every time a different keyword is selected. </li>
      </ul>
     <br>
     <h2>View Graphs:</h2>
     <p>After uploading data, users can view graphs by 
       clicking on the “Graph” tab from the menu on the top</p>
  </article>
</section>



<footer>
 
</footer>

        

</div>





</template>




<script>

// @ is an alias to /src
export default {
  name: 'Contact',
  components: {
    
  }
}



</script>





<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

/* Style the header */
header {
  background-color: #e2ebfd;
  padding: 20px;
  text-align: center;
  font-size: 35px;
  color: white;
}

/* Container for flexboxes */
section {
  display: -webkit-flex;
  display: flex;
}

/* Style the navigation menu */
nav {
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  background: #5f75f1;
  padding: 3px;
}

/* Style the list inside the menu */
nav ul {
  list-style-type: none;
  padding: 0;
}

/* Style the content */
article {
  -webkit-flex: 3;
  -ms-flex: 3;
  flex: 3;
  background-color: #f1f1f1;
  padding: 10px;
}

/* Style the footer */
footer {
  background-color: #121172;
  padding: 10px;
  text-align: center;
  color: white;
}

/* Responsive layout - makes the menu and the content  sit on top of each other  */
@media (max-width: 600px) {
  section {
    -webkit-flex-direction: column;
    flex-direction: column;
  }
}


</style>
