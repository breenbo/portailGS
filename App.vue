<template>
  <div id="app">
    <transition name="headerSlide" appear>
      <router-view
          name="header"
          :key="$route.params.id"></router-view>
    </transition>
    <navbar
       :liens="liens"
    ></navbar>
    <plan :annuaire="annuaire"
          :liensPlan="liensPlan"
    ></plan>
    <!-- pass annuaire for birthday card -->
    <router-view
      name="main"
      :echeances="echeances"
      :comm="comm"
      :annuaire="annuaire"
      :referentiel="referentiel"
    ></router-view>
  </div>
</template>

<script>
import plan from "./components/plan.vue";
import navbar from "./components/navbar.vue";
import { devChoices } from "./mixins/devChoices"
import { createDatas } from "./mixins/initFunctions"
// import { setInterval } from 'timers';

export default {
  data() {
    return {
      echeances: [],
      comm: [],
      annuaire: [],
      liens:[],
      liensPlan:[],
      referentiel:[],
      meteo: [],
    };
  },
  name: "app",
  components: {
    navbar,
    plan
  },
  mixins:[devChoices, createDatas],
  created: function() {
    // try to use localStorage
    // const localEcheances = localStorage.getItem('echeances')
    // if (localEcheances != null) {
    //   this.echeances = JSON.parse(localEcheances)
    // }
    this.getDatas();
    // function to fetch every X minutes
    // setInterval(() => this.getDatas(), 5000)
  },
  methods: {
    getDatas() {
      fetch("comsEcheances.xlsx")
        .then(response => response.arrayBuffer())
        .then(response => this.convertToJSON(response))
        .then(response => {
          this.echeances = this.createObject(response[0], false, true);
          this.comm = this.createObject(response[1], true, false);
          this.referentiel = this.createObject(response[2], false, false);
          this.annuaire = this.createObject(response[3]);
          this.liens = this.createObject(response[4], false, false);
          this.liensPlan = this.createObject(response[5], false, false);
          // localStorage.setItem('echeances',JSON.stringify(this.echeances))
          // localStorage.setItem('comm',JSON.stringify(this.comm))
          // localStorage.setItem('annuaire',JSON.stringify(this.annuaire))
        });
    },
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1vw;
  text-align: center;
  color: #2c3e50;
  /* background-color: hsl(216, 33%, 97%); */
  margin: -10px;
  margin-top: -30px;
  /* margin-top: 60px; */
  display: grid;
  grid-template-areas:
    "header header header"
    "navbar navbar navbar"
    "left center right";
  grid-template-columns: 17vw 67vw 15.4vw;
  grid-template-rows: 20vw 3vw 80vh;
}
.headerSlide-enter,
.headerSlide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.headerSlide-leave,
.headerSlide-enter-to {
  opacity: 1;
}
.headerSlide-enter-active,
.headerSlide-leave-active {
  transition: all 0.6s ease-out;
}
.fa-icon {
  width: 1.6vw;
}
</style>
