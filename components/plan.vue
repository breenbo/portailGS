<template>
  <div id="container" :style="{backgroundColor:backgroundColor, color:fontColor}">
    <h1>Plan</h1>
    <annuaire :annuaire="annuaire" :services="services"></annuaire>
    <h2 v-for="item in plan" 
        :key="item.id" 
        :id="item.nom" 
        @mouseenter="hoverColor($event, true)"
        @mouseleave="hoverColor($event, false)"
    >
      {{item.nom}}
    </h2>
  </div>
</template>

<script>
import annuaire from "./annuaire.vue";
// import store from '../store'

export default {
  data() {
    return {
      plan: [
        { nom: "Feuille de service", lien: "" },
        { nom: "Programme", lien: "" },
        { nom: "Organnuaire", lien: "" },
        { nom: "Trombinoscope", lien: "" },
        { nom: "Annuaire FAA", lien: "" },
        { nom: "Plan Desaix", lien: "" }
      ]
    };
  },
  components: {
    annuaire
  },
  props: ["annuaire", "services"],
  methods: {
    hoverColor(event, hover) {
      if (hover) {
        this.$route.params.id
          ? (event.target.style.color = this.services[this.$route.params.id].supportColor)
          : "";
      } else {
        this.$route.params.id
          ? (event.target.style.color = this.services[
              this.$route.params.id
            ].darkFontColor)
          : "";
      }
    }
  },
  computed: {
    backgroundColor() {
      return this.$route.params.id
        ? this.services[this.$route.params.id].lightbgcolor
        : "";
    },
    fontColor() {
      return this.$route.params.id
        ? this.services[this.$route.params.id].darkFontColor
        : "";
    },
  }
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
</style>