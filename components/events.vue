<template>
    <div id="container">
        <h1>Echeances</h1>
        <!-- <h1 @click="eventDataBase">Echeances</h1> -->
        <div v-for="(value, key) in temporalMarkup" :key="value.id">
            <div class="semaine">{{value}}</div>
            <div v-for="event in echeances.filter(event => event.sorted === key)" class="event-card" :style="borderClass(event)" :key="event.id">
                <span class="jour">{{event.Echeance.getDate().toString().padStart(2,"0")}}</span>
                <span class="mois">
                     {{devChoices.months[event.Echeance.getMonth()]}}
                </span>
                <span class="heure" v-if="event.heure"> - {{event.heure}}</span>
                <v-icon v-for="domain in event.domains" :key="domain.id" :name="devChoices.domainsDict[domain].logo" scale="1.5" class="logo"/>
                <span v-html="event.html" class='event'></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            temporalMarkup : {
                past : "En cours...",
                today : "Aujourd'hui",
                tomorrow : "Demain",
                afterTomorrow : "Après-demain",
                thisWeek : "7 jours",
                nextWeek : "14 jours",
                thisMonth : "30 jours",
                futur : "Plus tard"
            }
        }
    },
    props:['annuaireArray', 'echeances', 'logoDict', 'devChoices'],
    methods : {
        borderClass : (obj) => {
            const border = `border-left:solid 6px ${obj.borderColor}`
            return border
        }
    }
}
</script>

<style scoped>
    #container {
        grid-area: left;
        background-color: lightgreen;
    }
    .event-card {
        text-align:left;
        background-color: hsl(351,95%,99%);
        min-height:4vw;
        margin-top:5px;
        margin-left:1vw;
        margin-right:1vw;
        border-radius:2px;
        box-shadow : 0 1px 1px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.19);
    }
    .jour {
        background-color: hsl(220,0%,99%);
        color:hsl(351,85%,52%);
        font-size: 1.5vw;
        font-weight: bold;
        margin-left:0.5vw;
        /* padding:0.6vw; */
        box-shadow : 0 2px 2px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
    }
    .semaine {
        color:hsl(351,85%,52%);
        font-size:1.5vw;
        margin:1.5vw 1vw 1vw 1vw;
        text-align: right;
        border-bottom:solid 1px hsl(351,85%,52%);
        padding-bottom:0.5vw;
    }
    .mois, .heure {
        font-size: 1.3vw;
        color:hsl(351,25%,30%);
    }
    .heure {
        font-size: 1.2vw;
        font-style: italic;
    }
    .event {
        display:block;
        font-size: 1.2vw;
        /* margin:20px 10px 0 0; */
        /* padding-bottom:20px; */
        text-align:right;
        margin-top:15px;
        margin-right:5px;
        color:hsl(351,25%,30%);
    }
    .logo {
        float:right;
        font-size:1em;
        margin: 0 5px;
        margin-top:0.45vw;
        margin-left:0;
        color:hsl(351,25%,80%);
        color:hsl(0,0%,80%);
    }
</style>