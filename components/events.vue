<template>
  <div id="container" :style="{color:fontColor, backgroundColor:backgroundColor}">
    <h1>Echéances</h1>
    {{routeId}}
    <div v-for="(value, key) in temporalMarkup" :key="value.id">
      <div class="semaine"
           :style="{color:fontColor, borderBottomColor:fontColor}"
      >
        {{value}}
      </div>
      <transition-group name="eventSlide" appear>
        <div
          v-for="event in filteredEcheances(key, $route.params.id)"
          class="event-card"
          :style="borderClass(event)"
          :key="event.key"
        >
          <span class="jour">{{event.Echeance.getDate().toString().padStart(2,"0")}}</span>
          <span class="mois">{{devChoices.months[event.Echeance.getMonth()]}}</span>
          <span class="heure" v-if="event.heure">- {{event.heure}}</span>
          <!-- icon only for domain != accueil -->
          <v-icon
            v-for="domain in event.domains.filter(el=>el.indexOf('accueil') === -1)"
            :key="domain.id"
            :name="devChoices.services[domain].logo"
            scale="1.5"
            class="logo"
          />
          <span v-html="event.html" class="event"></span>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../eventBus.js";

export default {
  data() {
    return {
      temporalMarkup: {
        past: "En cours...",
        today: "Aujourd'hui",
        tomorrow: "Demain",
        afterTomorrow: "Après-demain",
        thisWeek: "7 jours",
        nextWeek: "14 jours",
        thisMonth: "30 jours",
        futur: "Plus tard"
      },
      search: /(?:)/,
      routeId:''
    };
  },
  props: ["echeances", "logoDict", "devChoices"],
  methods: {
    borderClass(obj) {
      const border = `border-left:solid 6px ${obj.color}`;
      return border;
    },
    filteredEcheances(key, id) {
      // filter echeances array if id for each pages
      return this.echeances
        .filter(el => el.sorted === key)
        .filter(el => (id === undefined ? true : el.domains.indexOf(id) !== -1))
        .filter(el => this.search.test(el.Texte));
    }
  },
  computed: {
    backgroundColor () {
      return this.$route.params.id ? this.devChoices.services[this.$route.params.id].lightbgcolor : ''
    },
    fontColor () {
      return this.$route.params.id ? this.devChoices.services[this.$route.params.id].darkFontColor : ""
    },
    supportColor () {
      return this.$route.params.id ? this.devChoices.services[this.$route.params.id].supportColor : ""
    }
  },
  created() {
    EventBus.$on("searchEdit", search => (this.search = search));
  }
};
</script>

<style scoped>
#container {
  grid-area: left;
  background-color: hsl(221,68%,93%);
  overflow-y: scroll;
  overflow-x: hidden;
}
.event-card {
  text-align: left;
  background-color: hsl(351, 0%, 99%);
  min-height: 4vw;
  margin-top: 5px;
  margin-left: 1vw;
  margin-right: 1vw;
  border-radius: 2px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.19);
}
.jour {
  background-color: hsl(220, 0%, 99%);
  color: hsl(351, 85%, 52%);
  font-size: 1.5vw;
  font-weight: bold;
  margin-left: 0.5vw;
  /* padding:0.6vw; */
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
}
.semaine {
  color: hsl(351, 85%, 52%);
  font-size: 1.5vw;
  margin: 1.5vw 1vw 1vw 1vw;
  text-align: right;
  border-bottom: solid 1px;
  padding-bottom: 0.5vw;
}
.mois,
.heure {
  font-size: 1.3vw;
  color: hsl(351, 25%, 30%);
}
.heure {
  font-size: 1.2vw;
  font-style: italic;
}
.event {
  display: block;
  font-size: 1.2vw;
  /* margin:20px 10px 0 0; */
  /* padding-bottom:20px; */
  text-align: right;
  margin-top: 0.5vw;
  margin-right: 5px;
  color: hsl(351, 25%, 30%);
  padding-bottom:10px;
}
.logo {
  float: right;
  width:1.5vw;
  margin: 0 5px;
  margin-top: 0.45vw;
  margin-left: 0;
  color: hsl(351, 25%, 80%);
  color: hsl(0, 0%, 80%);
}
.eventSlide-enter,
.eventSlide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.eventSlide-leave,
.eventSlide-enter-to {
  opacity: 1;
}
.eventSlide-enter-active,
.eventSlide-leave-active {
  transition: all 0.6s ease-out;
}
.eventSlide-leave-active {
  position: absolute;
}
.eventSlide-move {
  transition: transform 0.6s;
}
</style>
