<template>
  <div id="main">
    <events v-if="echeances.length !== 0" 
            :echeances="echeances" 
            :devChoices="devChoices"
    >
    </events>
    <!-- skeleton to load on fetching -->
      <div v-else id="skeleton">
        <h1>Echeances</h1>
        <template v-for="n in 6">
          <div class="event-card" :key="n">
            <div class="jour"></div>
            <div class="mois"></div>
            <div class="event"></div> 
          </div>
        </template>
      </div>
    <coms v-if="comm.length !== 0" 
          :comm="comm" 
          :devChoices="devChoices" 
          :annuaire="annuaire"
          :referentiel="referentiel"
    >
    </coms>
    <!-- skeleton to load on fetching -->
    <div v-else>
      <h1>Communications</h1>
      <template v-for="n in 2">
        <article class="centerCard" :key="n">
          <div class="cardHeader">
            <div class="cardHeaderText"></div>
            <div class="comDate"></div>
          </div>
          <div class="cardBody"></div>
        </article>
      </template>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import events from "../components/events.vue";
import coms from "../components/coms.vue";
// import XLSX from 'xlsx'

export default {
  props: ["echeances", "devChoices", "comm", "annuaire", "referentiel"],
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
.event-card {
  text-align: left;
  background-color: hsl(0, 0%, 99%);
  min-height: 4vw;
  margin-top: 1vw;
  margin-left: 1vw;
  margin-right: 1vw;
  border-radius: 2px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.19);
}
.jour {
  display:inline-block;
  background-color: hsl(351, 85%, 85%);
  margin-left: 0.5vw;
  margin-top: 0.3vw;
  width:1.8vw;
  height:1.8vw;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
}
.mois{
  display:inline-block;
  margin-left:1vw;
  margin-bottom: 0.3vw;
  width:70%;
  height:1.3vw;
  background-color: hsl(351, 0%, 92%);
}
.event {
  display: block;
  float:right;
  margin-top: -0.1vw;
  margin-right: 5px;
  padding-bottom:10px;
  width:70%;
  height:1vw;
  background-color: hsl(351, 0%, 92%);
}
.centerCard {
  text-align: left;
  /* padding:0vw 0vw 1.5vw 0vw; */
  background-color: hsl(0, 0%, 98%);
  border-radius: 5px;
  border: solid 1px hsl(0, 0%, 85%);
  z-index: 1;
  width:95%;
  height:15vw;
  margin-top:2vw;
  margin-left:2vw;
  box-shadow : 0 4px 4px rgba(0, 0, 0, 0.2), 0 4px 4px rgba(0, 0, 0, 0.19);
}
.cardHeader {
  height:3vw;
  background-color: hsl(0, 0%, 98%);
  border-bottom: solid 1px hsl(0, 0%, 90%);
  padding: 0.8vw 0.5vw 0.5vw 0.5vw;
}
.cardHeaderText {
  height:1.5vw;
  width:20vw;
  background-color: hsl(0, 0%, 92%);
}
.cardBody {
  margin: 1vw 1.5vw;
  height:8vw;
  background-color: hsl(351, 0%, 92%);
}
.comDate {
  margin-left: 25px;
  margin-top:0.5vw;
  height:1vw;
  width:10vw;
  background-color: hsl(351, 0%, 92%);
}
</style>