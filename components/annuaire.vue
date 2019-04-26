<template>
  <div id="annuaire">
    <div id="title">
      <h2 @click="init"
          @mouseenter="hoverColor($event, true)"
          @mouseleave="hoverColor($event, false)"
      >
        Annuaire GSBdD
      </h2>
    </div>
    <transition name="fade">
      <div id="body"
           v-show="annuaireView"
           :style="{borderLeftColor:borderColor}"
      >
        <h1 id="titre">
          Annuaire GSBdD
          <!-- <v-icon id="closeButton" name="times-circle" scale="3"/> -->
        </h1>
        <input
          type="text"
          id="input"
          v-model="searchInput"
          placeholder="recherche par grade, prénom, nom, service, fonction"
        >
        <div id="result">
          <div class="row" v-for="result in filteredAnnuaire" :key="result.id">
            <div v-for="field in searchFields" :key="field.id">{{result[field]}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      annuaireView: false,
      searchInput: "",
      searchFields: ["grade", "prenom", "nom", "compagnie", "poste", "tel"]
    };
  },
  computed: {
    filteredAnnuaire() {
      const regexp = new RegExp(this.searchInput, "i");
      // create filtered array depending of matching regexp with filter and return true on regexp -> keep in filtered array
      return this.annuaire.filter(line => {
        let testString = "";
        for (const field of this.searchFields) {
          testString += `${line[field]} `;
        }
        return regexp.test(testString);
      });
    },
    borderColor() {
      return this.$route.params.id ? this.services[this.$route.params.id].supportColor : ""
    }
  },
  methods: {
    init() {
      this.searchInput = "";
      this.annuaireView = !this.annuaireView;
      // give focus on input field : use nextTick to wait creation
      this.$nextTick(() => document.getElementById("input").focus());
    },
    hoverColor(event, hover) {
      if (hover) {
        this.$route.params.id
          ? (event.target.style.color = this.services[this.$route.params.id].supportColor)
          : (event.target.style.color = "red");
      } else {
        this.$route.params.id
          ? (event.target.style.color = this.services[
              this.$route.params.id
            ].darkFontColor)
          :  event.target.style.color = "#2c3e50";
      }
    }
  },
  mounted() {
    // close annuaire on focus lost == esc pressed
    document.getElementById("input").onblur = () => {
      this.annuaireView = false;
    };
  },
  props: ["annuaire", "services"]
};
</script>

<style scoped>
h2 {
  text-align: left;
  padding-left: 2vw;
  cursor: pointer;
}
#body {
  position: absolute;
  top: 8vh;
  left: -65vw;
  z-index: 9;
  text-align: left;
  padding: 0 1vw;
  border: solid 1px hsl(0, 0%, 85%);
  border-radius: 5px;
  min-width: 60vw;
  background-color: white;
  box-shadow: 0 24px 24px rgba(0, 0, 0, 0.2), 0 24px 24px rgba(0, 0, 0, 0.19);
  border-left:solid 8px;
}
#input {
  width: 58vw;
  height: 2vw;
}
#result {
  margin: 1vw;
  max-height: 60vh;
  overflow-y: scroll;
}
#closeButton {
  position: relative;
  top: -1.8vw;
  right: -1.7vw;
  float: right;
  color: lightblue;
}
#closeButton:hover {
  color: red;
}
.row {
  display: grid;
  grid-template-columns: 2.5vw 10vw 15vw 7vw 10vw 12vw;
  padding: 0.25vw 0;
  border-bottom: solid 1px hsl(0, 0%, 85%);
}
.show {
  display: grid;
}
.hide {
  display: none;
}
.fade-enter,
.fade-leave-to {
  transform: scaleY(0.7);
  opacity: 0;
}
.fade-leave,
.fade-enter-to {
  opacity: 1;
  transform: scaleY(1);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease-out;
  transform-origin: top center;
}
</style>
