<template>
  <div id="container">
    <router-link
      v-for="service in computedServices"
      tag="span"
      :key="service.id"
      :to="['Accueil'].indexOf(service.name) !== -1  ? '/' : service.name"
      :id="service.name"
      :style="{borderColor:borderColor, color:fontColor}"
    >
      <span @mouseenter="hoverColor($event, true)"
            @mouseleave="hoverColor($event, false)"
            class="title"
            :style="{color:fontColor}"
      >
          <v-icon v-if="service.logo" :name="service.logo" scale="1.5" class="logo"/>
            <span>{{service.name}}</span>
      </span>
    </router-link>
    <div id="menuLinks"
         class="title"
         @mouseenter="showLinks=true"
         @mouseleave="showLinks=false"
         :style="{color:fontColor}"
         v-if="!inputShow"
    >
      <v-icon name="link" scale="1.5" class="logo"/>
      Liens
      <transition name="dropdown">
        <div class="subMenu" v-if="showLinks">
          <div v-for="lien in liens" :key="lien.id">
            <a :id="lien.nomLien"
               :href="lien.adresse"
               :style="{color:fontColor}"
               @mouseenter="hoverColor($event, true)"
               @mouseleave="hoverColor($event, false)"
               class="subMenuLink"
            >
               {{lien.nomLien}}
            </a>
          </div>
        </div>
      </transition>
    </div>

    <div
        id="searchContainer"
        :style="{backgroundColor:borderColor}"
        @click="initSearch"
    >
    <v-icon name="search"
            v-if="!inputShow"
            scale="2"
            class="searchIcon"/>
    <v-icon name="plus"
            scale="4"
            class="searchIcon"
            id="closeIcon"
            v-else/>
    </div>
    <input
      id="inputSearch"
      v-if="inputShow"
      type="text"
      v-model="search"
      @keyup="searchEdit"
      placeholder="Recherche cartes et échéances"/>
  </div>
</template>

<script>
// import store from '../store'
import { EventBus } from "../eventBus";
import { colors } from "../mixins/colors"
import { devChoices } from "../mixins/devChoices"

export default {
  data() {
    return {
      search: "",
      searchRegexp: /(?:)/,
      showLinks: false,
      inputShow:false
    };
  },
  props: ["liens"],
  mixins:[devChoices, colors],
  methods: {
    initSearch() {
        this.search = ""
        this.searchRegexp = /(?:)/
        EventBus.$emit("searchEdit", this.searchRegexp);
        this.inputShow = !this.inputShow
        //this.$nextTick(() => document.getElementById("inputSearch").focus())
    },
    showSubMenu() {
      // service.show = !service.show
      this.showLinks = !this.showLinks;
    },
    searchEdit() {
      this.searchRegexp = new RegExp(this.search, "i");
      EventBus.$emit("searchEdit", this.searchRegexp);
    },
  },
  computed: {
    computedServices () {
      const servNames = Object.keys(this.services)
      const len = servNames.length
      let servicesArray = []
      for (let i=0; i<len; i++) {
          let servObj = {}
          servObj.name = servNames[i]
          servObj.name === 'accueil' ? servObj.name = 'Accueil':''
          servObj.logo = this.services[servNames[i]].logo
          servicesArray.push(servObj)
      }
      if (!this.inputShow) {
        return servicesArray
      } else {
        return ''
      }
    }
  }
};
</script>

<style scoped>
#container {
  grid-area: navbar;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2vw;
  align-items: center;
  position: sticky;
  top: 0px;
  z-index: 999;
  padding: 0 0.5vw;
  /* margin:-4px 0 -4px -4px; */
  box-shadow: 0 9px 9px rgba(0, 0, 0, 0.15), 0 9px 9px rgba(0, 0, 0, 0.10);
}
#Accueil {
  display:block;
  margin-left:1vw;
}
.title {
  /* color: hsl(209,18%,30%); */
  color: #2c3e50;
  font-size: 1.5vw;
  /* padding:5px; */
  cursor: pointer;
  /* border-radius: 30px; */
  display:grid;
  grid-template-columns: 2.5vw 1fr;
  align-items:center;
  justify-items: start;
}
/*.title:hover {
  color:red;
} */
.logo {
  margin-left: 0.5vw;
  /* justify-self: center; */
}
.subMenu {
  position: absolute;
  top:2.5vw;
  right: 6vw;
  padding:1vw 2vw;
  border: solid 1px hsl(0, 0%, 85%);
  background-color: #fff;
  border-radius: 4px;
  text-align: left;
  font-size: 1.2vw;
  box-shadow: 0 24px 24px rgba(0, 0, 0, 0.2), 0 24px 24px rgba(0, 0, 0, 0.19);
  display:grid;
  grid-template-columns: repeat(2, auto);
  grid-column-gap: 2vw;
  grid-row-gap:2vh;
}
.subMenuLink {
  text-decoration: none;
  color: #2c3e50;
}
/* .subMenuLink:hover {
  color:red;
} */
input {
  margin: 0 1vw;
  font-size: 1.2vw;
  height: 2vw;
}
.title {
  text-decoration: none;
}
.router-link-exact-active {
  border-bottom: solid 4px hsl(209,18%,30%);
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.25s ease-out;
}
.dropdown-enter,
.dropdown-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
.dropdown-leave,
.dropdown-enter-to {
  opacity: 1;
}
.navbar-enter-active,
.navbar-leave-to {
    transition: all 0.25s ease-out;
}
.navbar-enter,
.navbar-leave-to {
    opacity:1;
}
.navbar-leave,
.navbar-enter-to {
    opacity:0;
}
.searchIcon {
    justify-self: center;
    align-self: center;
}
#closeIcon {
    transform: rotate(45deg);
    margin-top:-4px;
}
#searchContainer {
    position: absolute;
    right:2vw;
    height:4vw;
    width:4vw;
    border-radius:50%;
    box-shadow: 0 4px 2px gray;
    display:grid;
    background-color: red;
}
#inputSearch {
    position:absolute;
    right:6vw;
    width:40vw;
}
/* remove underline in router-link */
li a {
    text-decoration: none;
}
</style>
