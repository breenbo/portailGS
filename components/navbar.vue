<template>
  <div id="container">
    <router-link
      v-for="service in services"
      :key="service.id"
      class="title"
      :to="['Accueil'].indexOf(service.name) !== -1  ? '/' : service.name"
      :id="service.name"
      :style="{borderColor:borderColor, color:fontColor}"
    >
      <div @mouseenter="hoverColor(service.name, true)" @mouseleave="hoverColor(service.name, false)">{{service.name}}</div>
      <v-icon v-if="service.logo" :name="service.logo" scale="1.5" class="logo"/>
    </router-link>
    <div id="menuLinks" class="title" 
         @mouseenter="showLinks=true" 
         @mouseleave="showLinks=false"
         :style="{color:fontColor}"
    >
      Liens
      <v-icon name="link" scale="1.5" class="logo"/>
      <transition name="dropdown">
        <div class="subMenu" v-show="showLinks">
          <div v-for="lien in liens" :key="lien.id">
            <a :id="lien.nomLien"
               :href="lien.adresse" 
               :style="{color:fontColor}" 
               @mouseenter="hoverColor(lien.nomLien, true)"
               @mouseleave="hoverColor(lien.nomLien, false)"
               class="subMenuLink"
            >
               {{lien.nomLien}}
            </a>
          </div>
        </div>
      </transition>
    </div>
    <input
      type="text"
      v-model="search"
      @keyup="searchEdit"
      placeholder="Recherche cartes et échéances"
    >
  </div>
</template>

<script>
// import store from '../store'
import { EventBus } from "../eventBus";

export default {
  data() {
    return {
      search: "",
      searchRegexp: /(?:)/,
      showLinks: false
    };
  },
  props: ["services", "liens", "domains"],
  methods: {
    showSubMenu() {
      // service.show = !service.show
      this.showLinks = !this.showLinks;
    },
    searchEdit() {
      this.searchRegexp = new RegExp(this.search, "i");
      EventBus.$emit("searchEdit", this.searchRegexp);
    },
    hoverColor(id, hover) {
      const el = document.getElementById(id)
      if (hover) {
        this.$route.params.id ? el.style.color = this.domains[this.$route.params.id].supportColor : ""
      } else {
        this.$route.params.id ? el.style.color = this.domains[this.$route.params.id].darkFontColor : ""
      }
    }
  },
  computed: {
    borderColor() {
      return this.$route.params.id ? this.domains[this.$route.params.id].supportColor : ""
      // return this.$route.params.id ? this.services[this.$route.params.id].fontColor : ""
    },
    fontColor () {
      return this.$route.params.id ? this.domains[this.$route.params.id].darkFontColor : ""
    }
  }
};
</script>

<style scoped>
#container {
  grid-area: navbar;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(9, 1fr) 20vw;
  grid-column-gap: 10px;
  align-items: center;
  position: sticky;
  top: 0px;
  z-index: 999;
  padding: 0 0.5vw;
  margin:-4px 0 -4px -4px;
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
  padding:5px;
  cursor: pointer;
  /* border-radius: 30px; */
  display:grid;
  grid-template-columns: repeat(2,1fr);
  align-items:center;
}
.title:hover {
  color:red;
}
.logo {
  margin-left: 0.5vw;
}
.subMenu {
  position: absolute;
  top:3vw;
  right: 16vw;
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
.subMenuLink:hover {
  color:red;
}
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
</style>