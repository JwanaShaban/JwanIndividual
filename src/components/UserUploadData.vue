<template>
  <div id="uploadForm">
    <form @submit="checkForm($event)">
      <div>
        Title:
        <input
          class="form-control input-sm"
          type="text"
          v-model="submission.uploadTitle"
          name="uploadTitle"
          id="uploadTitle"
        />
      </div>
      <div>
        Details:
        <input
          class="form-control input-sm"
          type="textarea"
          v-model="submission.uploadDetails"
          name="uploadDetails"
          id="uploadDetails"
        />
      </div>
      <div>
        CSV Data:
        <input
          type="file"
          ref="fileInput"
          accept=".csv"
          @change="handleFileChange($event)"
        />
      </div>
      <div>
        Tags:
        <input type="text"  class="form-control input-sm" v-model="submission.tempTag" @keydown="addTag" />
      </div>
      <div v-for="tag in submission.tags" :key="tag" class="pill">
        <span @click="deleteTag(tag)">{{ tag }}</span>
      </div>
      <input type="submit" class="btn btn-success" value="Add" />
    </form>
  </div>
</template>

<script>
import Papa from "papaparse";
import { createSubmission, timestamp } from "../firebase/database";
import emailjs from 'emailjs-com';
import {ref} from "vue";
import {firebaseAuthentication } from "@/firebase/database";

const initForm = {
  uploadTitle: "",
  uploadDetails: "",
  tempTag: "",
  validData: true,
  tags: [],
  availability: {
    col1: {
      title: '',
      rows:[]
    },
    col2: {
    title: '',
    rows: []
    }
  },
  createdAt: timestamp(),
};
export default {
  name: "#uploadForm",
  setup(){

    const user = ref(firebaseAuthentication.currentUser.email);



    return {user}
  },

  data() {
    return {
      submission: this.cloneFormData(initForm),
      uploadedSubmission: null,
    };
  },
  methods: {
  
    deleteTag(tag) {
      this.submission.tags = this.submission.tags.filter((item) => {
        return tag !== item;
      });
    },
    addTag(e) {
      if (e.key === "," && this.submission.tempTag) {
        e.preventDefault();
        if (!this.submission.tags.includes(this.submission.tempTag)) {
          this.submission.tags.push(this.submission.tempTag);
        }
        this.submission.tempTag = "";
      }
    },
    handleFileChange(evt) {
      var file = evt.target.files[0];
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          console.log(results.data)
          results.data.pop()
          if(Object.keys(results.data[1]).length !== 2) {
            this.submission.validData = false;
            alert("The file you have uploaded contains more or less than two columns! Please add a file with two columns");
            return;
          }else{
            this.submission.validData = true;
          }
        this.submission.availability ={
            col1: { 
              rows: results.data.map((item)=> item [results.meta.fields[0]]),
              title: results.meta.fields[0]
            },
            col2: { 
              rows: results.data.map((item)=> item [results.meta.fields[1]]), 
              title: results.meta.fields[1]
            }
          }
          console.log(this.submission.availability)
        },
      });
    },
    checkForm(evt) {
      evt.preventDefault();

      if (
        !this.submission.uploadTitle ||
        !this.submission.uploadDetails ||
        !this.submission.tags.length ||
        this.submission.availability == null ||
        this.submission.tags.length > 5
      ) {
        alert("Please fill all inputs");
      } else if(!this.submission.validData){
        alert("Invalid File, file must be CSV and contain two only two columns");
      }
      
      else {
        this.createPost();
      }
    },
    cloneFormData(formData) {
      return {
        ...formData,
        tags: [...formData.tags],
        //availability: formData.availability ? [...formData.availability] : null,
      
      };
    },
    createPost() {
      this.uploadedSubmission = this.cloneFormData(this.submission);
      console.log(this.uploadedSubmission)
      this.$refs.fileInput.value = "";
      this.submission = this.cloneFormData(initForm);
      console.log(this.uploadedSubmission)
      this.uploadDB(this.uploadedSubmission);
    },

    async uploadDB() {
      await createSubmission({ ...this.uploadedSubmission });
      console.log(this.user);
      console.log(timestamp);
      var templateParams = {
            email: this.user,
            timestamp: timestamp
            };
        emailjs.send("service_cswgxab","template_xnxwgk3",templateParams,"user_TfsemkgXGUUnBYOXERVQC");
      return this.uploadedSubmission;
    },
  },
};
</script>
<style>
.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}
.pill:hover {
  background: #ff6666;
}

</style>
