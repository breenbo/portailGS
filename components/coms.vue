<template>
  <div id="container">
    <router-view></router-view>
      <h1>Communications</h1>
      <article v-for="com in filteredComs($route.params.id)" 
               :key="com.id" class="centerCard">
        <div class="cardHeader" 
             :style="borderClass(com)" 
             @click="toggleBody(com)">
          {{com.Titre}}
          <!-- icon only for domain != accueil -->
          <v-icon v-for="domain in com.domains.filter(el => el.indexOf('accueil') === -1)" 
                  :key="domain.id" 
                  :name="devChoices.domainsDict[domain].logo" 
                  scale="2.5" class="logo"/>
          <div class="comDate">{{com.literalDate}}</div>
        </div>
        <div v-html="com.Texte" class="cardBody" v-if="com.bodyView"></div>
      </article>
      <!-- <article v-for="com in comm.filter(el=>el.domains.indexOf($route.params.id) !== -1)"  -->
  </div>
</template>

<script>
import { EventBus } from '../eventBus.js'

export default {
  data () {
    return {
      search : /(?:)/
    }
  },
  props:['comm', 'devChoices'],
  methods: {
    // add color to border depending on object's color
    borderClass : (obj) => {
        const border = `border-left:solid 6px ${obj.color}`
        return border
    },
    toggleBody(com) {
      // change com.bodyView to toggle body
      com.bodyView = !com.bodyView
    },
    filteredComs (id) {
      // const regexp = new RegExp(this.search, 'i')
      // create filtered array depending of matching regexp with filter and return true on regexp -> keep in filtered array
      return this.comm
         .filter(el => id === undefined ? true : el.domains.indexOf(id) !== -1)
         .filter(el => {
             const testString = `${el.Titre} ${el.Texte}`
             return this.search.test(testString)
         })
    }
  },
  created () {
    EventBus.$on('searchEdit', search => this.search = search)
  }
}
</script>

<style scoped>
  #container {
      grid-area: center;
      padding:0 1vw;
  }
  .centerCard {
    text-align: left;
    /* padding:0vw 0vw 1.5vw 0vw; */
    margin:15px 0;
    background-color: hsl(351,95%,99%);
    border-radius:5px;
    border:solid 1px hsl(0,0%,85%);
    /* box-shadow : 0 4px 4px rgba(0, 0, 0, 0.2), 0 4px 4px rgba(0, 0, 0, 0.19); */
  }
  .centerCard:hover {
    box-shadow : 0 2px 2px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
    transition-property:box-shadow;
    transition-duration:0.2s;
  }
  .cardHeader {
    font-size: 1.3vw;
    font-weight: bold;
    color:hsl(220,10%,20%);
    background-color:hsl(220,0%,99%);
    border-bottom:solid 1px hsl(0,0%,90%);
    padding:0.8vw 0.5vw 0.5vw 0.5vw;
    cursor:pointer;
  }
  .cardBody {
    /* display:none; */
    text-align:justify;
    font-size:1.1vw;
    padding:1vw 1.5vw;
  }
  .cardBody::first-letter {
    font-size:150%;
  }
  .comDate {
    font-size:1vw;
    margin-left:25px;
    color:hsl(0,0%,50%);
    font-weight:normal;
  }
  .cardBody a:hover{
    color:purple;
  }
  .logo {
    font-size:2vw;
    float:right;
    margin:0 5px;
    color:hsl(0,0%,80%);
  }
</style>
