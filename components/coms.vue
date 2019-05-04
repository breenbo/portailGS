<template>
  <div id="container">
    <h1>Communications</h1>

    <article class="centerCard" v-if="birthdayView">
      <div class="cardHeader" style="border-left:solid 6px blue">
        Joyeux Anniversaire
        <div class="comDate">{{today}}</div>
      </div>
      <div v-html="birthdayText" class="cardBody"></div>
    </article>

    <transition-group name="comSlide" appear>
      <article v-for="com in filteredComs($route.params.id)" :key="com.key" class="centerCard">
        <div class="cardHeader" :style="borderClass(com)" @click="toggleBody(com)">
          {{com.Titre}}
          <!-- icon only for domain != accueil -->
          <v-icon
            v-for="domain in com.domains.filter(el => el.indexOf('accueil') === -1)"
            :key="domain.id"
            :name="services[domain].logo"
            scale="2.5"
            class="logo"
          />
          <div class="comDate">{{com.literalDate}}</div>
        </div>
        <div v-html="com.Texte" v-if="com.bodyView" class="cardBody"></div>
      </article>
    </transition-group>

<!-- show referentiel link if there are for specific page -->
<transition-group name="comSlide" appear>
    <div v-if="filteredRefs($route.params.id).length > 0" :key="$route.params.id">
      <h1 id="refTitle" :style="{borderColor:borderColor}">Référentiel {{$route.params.id}}</h1>
      <div class="refContainer">
        <div v-for="ref in filteredRefs($route.params.id)" :key="ref.id">
          <a :href="'referentiel/' + ref.fichier" target="_blank" :style="{color:fontColor}">
            <span v-if="ref.image"><img :src="'referentiel/' + ref.image" class="refImage"/></span>
            <span v-else
                  @mouseenter="hoverColor($event,true)"
                  @mouseleave="hoverColor($event,false)"
            >
              {{ref.nom}}
            </span>
          </a>
        </div>
      </div>
    </div>
</transition-group>

  </div>
</template>

<script>
import { EventBus } from "../eventBus.js";
import { devChoices } from "../mixins/devChoices"
import { colors } from "../mixins/colors"

export default {
  data() {
    return {
      search: /(?:)/,
      birthdayView: false,
      birthdayText: ''
    };
  },
  mixins:[devChoices, colors],
  props: ["comm", "annuaire", "referentiel"],
  methods: {
    toggleBody(com) {
      // change com.bodyView to toggle body
      com.bodyView = !com.bodyView;
    },
    filteredComs(id) {
      // const regexp = new RegExp(this.search, 'i')
      // create filtered array depending of matching regexp with filter and return true on regexp -> keep in filtered array
      return this.comm
        .filter(el => (id === undefined ? true : el.domains.indexOf(id) !== -1))
        .filter(el => {
          const testString = `${el.Titre} ${el.Texte}`;
          return this.search.test(testString);
        });
    },
    filteredRefs(id) {
      return this.referentiel
        .filter(el => (id === undefined ? false : el.domains.indexOf(id) !== -1))
    },
    anniversaireText() {
      const today = new Date();
      let birthdayArray = [];
      let birthdayText = "";
      for (const pers of this.annuaire.filter(el => el.dateNaissance)) {
        // if (pers.dateNaissance.getDate() === today.getDate()){
        if (
          pers.dateNaissance.getDate() === today.getDate() &&
          pers.dateNaissance.getMonth() === today.getMonth()
        ) {
          birthdayArray.push(pers);
          this.birthdayView = true;
        }
      }
      const len = birthdayArray.length;
      birthdayText += `L'ensemble du personnel de la DICOM Antilles souhaite un joyeux anniversaire`;
      for (let i = 0; i < len; i++) {
        if (["M.", "Mme"].indexOf(birthdayArray[i].grade) !== -1) {
          birthdayText += " à ";
        } else {
          birthdayText += " au ";
        }
        birthdayText += `<span style='color:hsl(351,85%,52%)'>${
          birthdayArray[i].grade
        } ${birthdayArray[i].prenom} ${birthdayArray[i].nom}</span>`;
        let liaison = "";
        if (i === len - 2) {
          liaison = " et ";
        } else if (i === len - 1) {
          liaison = ".";
        } else {
          liaison = ", ";
        }
        birthdayText += liaison;
      }
      birthdayText += `<br/> Vous pouvez inonder ${
        len > 1 ? "leurs boîtes" : "sa boîte"
      } mail, et même aller ${len > 1 ? "leur" : "lui"} souhaiter en personne.`;
      return this.birthdayText = birthdayText;
      // return this.annuaire.filter(el => el.dateNaissance)[1].dateNaissance
    },
  },
  computed: {
    today() {
      const today = new Date();
      return today.getDate() + " " + this.months[today.getMonth()];
    },
  },
  created: function() {
    EventBus.$on("searchEdit", search => (this.search = search));
    this.anniversaireText()
  }
};
</script>

<style scoped>
#container {
  grid-area: center;
  padding: 0 1vw;
  height: 100vh;
  overflow-y: scroll;
}
.centerCard {
  text-align: left;
  /* padding:0vw 0vw 1.5vw 0vw; */
  margin: 15px 0;
  background-color: hsl(0, 0%, 98%);
  border-radius: 5px;
  border: solid 1px hsl(0, 0%, 85%);
  z-index: 1;
  /* box-shadow : 0 4px 4px rgba(0, 0, 0, 0.2), 0 4px 4px rgba(0, 0, 0, 0.19); */
}
.centerCard:hover {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
  transition-property: box-shadow;
  transition-duration: 0.2s;
}
.cardHeader {
  font-size: 1.3vw;
  font-weight: bold;
  color: hsl(220, 10%, 20%);
  background-color: hsl(0, 0%, 98%);
  border-bottom: solid 1px hsl(0, 0%, 90%);
  padding: 0.8vw 0.5vw 0.5vw 0.5vw;
  cursor: pointer;
}
.cardBody {
  /* display:none; */
  text-align: justify;
  font-size: 1.1vw;
  padding: 1vw 1.5vw;
}
.cardBody::first-letter {
  font-size: 150%;
}
.comDate {
  font-size: 1vw;
  margin-left: 25px;
  color: hsl(0, 0%, 50%);
  font-weight: normal;
}
.cardBody a:hover {
  color: purple;
}
.logo {
  height:3vw;
  width: 2vw;
  float: right;
  margin: -0.2vw 5px;
  color: hsl(0, 0%, 80%);
}
.refContainer {
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 1vw;
  grid-row-gap: 1vw;
  font-size:1.5vw;
}
.refContainer a {
  text-decoration:none;
}
#refTitle {
  text-align: left;
  margin-top:10vh;
  padding-left:1vw;
  padding: 2vh 0 2vh 1vw;
  border-bottom:solid 2px;
  border-left:solid 12px;
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px;
}
.refImage {
  width:75%;
  box-shadow : 0 4px 4px rgba(0, 0, 0, 0.2), 0 4px 4px rgba(0, 0, 0, 0.19);
}
.refImage:hover {
  box-shadow : 0 16px 16px rgba(0, 0, 0, 0.2), 0 16px 16px rgba(0, 0, 0, 0.19);
}
.comSlide-enter,
.comSlide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.comSlide-leave,
.comSlide-enter-to {
  opacity: 1;
}
.comSlide-enter-active,
.comSlide-leave-active {
  transition: all 0.6s ease-out;
}
.comSlide-leave-active {
  position: absolute;
}
.comSlide-move {
  transition: transform 0.6s;
}
</style>
