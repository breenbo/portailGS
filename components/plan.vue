<template>
  <div id="container" :style="{backgroundColor:backgroundColor, color:darkColor}">
    <h1>Plan</h1>
    <!-- <h2>{{essai.test}}</h2> -->
    <annuaire :annuaire="annuaire"></annuaire>
    <h2>Feuille de service</h2>
    <h2>Programme</h2>
    <h2>Organnuaire</h2>
    <h2>Trombinoscope</h2>
    <h2>Annuaire FAA</h2>
    <h2>Plan Desaix</h2>
  </div>
</template>

<script>
import annuaire from "./annuaire.vue";
// import store from '../store'

export default {
  components: {
    annuaire
  },
  props: ["annuaire", "services"],
  computed: {
    backgroundColor () {
      return this.$route.params.id ? this.services[this.$route.params.id].lightbgcolor : ''
    },
    darkColor () {
      return this.$route.params.id ? this.services[this.$route.params.id].darkFontColor : ""
    }
  }
};
</script>

<style scoped>
#container {
  grid-area: right;
  background-color: hsl(221,68%,93%);
  height: 100vh;
  position: sticky;
  top: 3vw;
  z-index: 0;
}
h2 {
  text-align: left;
  padding-left: 2vw;
}
h2:hover {
  border-left: solid 6px black;
}
</style>
