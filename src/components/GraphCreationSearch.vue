<template>
  <div>
    <apexchart
      type="line"
      height="175"
      width="250"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["searchResult"],
  setup(props) {
    const chartOptions = ref({
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: props.searchResult.uploadTitle,
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        title: {
          text: props.searchResult.availability.col2.title,
        },
      },
      yaxis: {
        title: {
          text: props.searchResult.availability.col1.title,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    });

    const series = ref([
      {
        name: props.searchResult.availability.col1.title,
        data: props.searchResult.availability.col1.rows,
      },
      {
        name: props.searchResult.availability.col2.title,
        data: props.searchResult.availability.col2.rows,
      },
    ]);

    return { chartOptions, series };
  },
  methods: {
    createGraph() {},
  },
};
</script>
