<template>
  <div id="container" :style="{backgroundColor:backgroundColor, color:fontColor}">
    <h1>Plan</h1>
    <annuaire :annuaire="annuaire"
              :services="services"
              :style="{color:fontColor}"
    >
    </annuaire>
    <h2 v-for="item in liensPlan"
        :key="item.id"
        :id="item.nom"
    >
      <hr v-if="item.nom === '--'" />
      <a v-else
         :href="item.lien"
         :style="{color:fontColor}"
         @mouseenter="hoverColor($event, true)"
         @mouseleave="hoverColor($event, false)"
         target="_blank">
        {{item.nom}}
      </a>
    </h2>
  </div>
</template>

<script>
import annuaire from "./annuaire.vue";
import { devChoices } from "../mixins/devChoices"
import { colors } from "../mixins/colors.js"
// import store from '../store'

export default {
  components: {
    annuaire
  },
  props: ["annuaire", "liensPlan"],
  mixins:[devChoices, colors],
};
</script>

<style scoped>
#container {
  grid-area: right;
  background-color: hsl(221, 68%, 93%);
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
  color:red;
}
a {
  text-decoration:none;
  color: #2c3e50;
}
a:hover {
    color:red;
}
</style>
