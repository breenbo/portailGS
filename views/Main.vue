<template>
  <div id="main">
    <events v-if="echeances.length !== 0" :echeances="echeances" :devChoices="devChoices"></events>
    <coms v-if="comm.length !== 0" :comm="comm" :devChoices="devChoices"></coms>
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import events from "../components/events.vue";
import coms from "../components/coms.vue";
// import XLSX from 'xlsx'

export default {
  props: ["echeances", "devChoices", "comm"],
  name: "home",
  components: {
    events,
    coms
  }
};
</script>
<style scoped>
#main {
  display: grid;
  grid-template-areas: "left center right";
  grid-template-columns: 17vw 67vw 15vw;
}
</style>
