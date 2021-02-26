<template>
<div>
  <h1>{{ results.disease.diseaseName }}</h1>
  <div>
     <hr style="height:2px;border-width:0;color:gray;background-color:gray">
<h2> External results</h2>
 <hr style="height:2px;border-width:0;color:gray;background-color:gray">
    <h2 v-on:click="isHidden = !isHidden">Symptoms</h2>
  </div>
  <div v-if="isHidden">
    <div v-for="item in results.catTermsMap" :key="item" class="#this">
      <h4>{{ item.catLabel }}</h4>

      <div v-for="detail in item.terms" :key="detail">
        <h5>{{ detail.name }}</h5>
        <h6>{{ detail.definition }}</h6>
      </div>
    </div>
  </div>
     <h2> Internal Results</h2>
  <div v-for="result in internalResults" :key="result">
 <hr style="height:2px;border-width:0;color:gray;background-color:gray">
 
     <hr style="height:2px;border-width:0;color:gray;background-color:gray">
    <h3>Title:  {{ result.uploadTitle }}</h3>
    <h3> Details:  {{result.uploadDetails }}</h3>
    <h3>Graph:</h3>
    <p class="graph"><graph-creation-search v-bind:searchResult="result" /></p>
  </div>
  </div>
</template>
<script>
import GraphCreationSearch from "../components/GraphCreationSearch";
export default {
  props: ["results", "internalResults"],
  data() {
    return {
      isHidden: false,
      subHidden: false,
    };
  },
  components: {
    GraphCreationSearch,
  },
  methods: {},
};
</script>
<style scoped>
.graph{
  text-align: center;
}
</style>