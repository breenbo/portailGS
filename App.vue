<template>
  <div id="app">
    <entete></entete>
    <navbar :services="devChoices.services"></navbar>
    <plan :annuaire="annuaire"></plan>
    <events v-if="echeances.length !== 0" :echeances="echeances" :devChoices="devChoices"></events>
    <coms v-if="comm.length !== 0" :comm="comm" :devChoices="devChoices"></coms>
  </div>
</template>

<script>

import entete from './components/entete.vue'
import plan from './components/plan.vue'
import events from './components/events.vue'
import coms from './components/coms.vue'
import navbar from './components/navbar.vue'
import XLSX from 'xlsx'
// import { setInterval } from 'timers';

export default {
  data () {
    return {
      echeances : [],
      comm : [],
      annuaire : [],
      meteo : [],
      devChoices: {
          months : ['janvier', 'février','mars', 'avril', 'mai', 'juin', 'juillet','août','septembre','octobre','novembre','décembre'],
          domaines : ['ceremonie','cdt','cpu','cmi','cohez','cyclone','da','epms','infra','logfin','mco','pil','prodef','pam','pc','service_courant','secu','secre','sst','ugm','b2m'],
          services : [
            {name:'Accueil', logo:''},
            {name: 'DICOM', logo:'male'},
            {name: 'PIL', logo:'tasks'},
            {name: 'SAF', logo:'shopping-cart'},
            {name: 'SAP', logo:'address-card'},
            {name: 'SSC', logo:'car'},
            {name: 'SSV', logo:'bed'},
            {name: 'HSCT', logo:'street-view'},
            {name:'Liens', logo:'link', 
              subMenu:[{nom:'FAA', link:'faa.com'}, {nom:'GSBdD', link:'gsbdd.com'}, {nom:'SCA',link:'sca.com'}], 
              show:false
            }
          ],
          domainsDict : {
              ceremonie: { logo : 'male', borderColor : 'hsl(240,100%,5%)' },
              cdt: { logo: 'anchor', borderColor : 'hsl(240,100%,10%)'},
              cohez: { logo: 'chart-pie', borderColor: 'hsl(200,100%,30%'},
              cpu: { logo:'hands-helping', borderColor:'hsl(200,100%,30%'},
              cmi: { logo:'bug', borderColor:'hsl(160,100%,30%)'},
              cyclone: { logo:'cloud', borderColor:'hsl(21,100%,60%)'},
              da: { logo:'address-card', borderColor:'hsl(0,75%,35%)'},
              epms: { logo:'heartbeat', borderColor:'hsl(270,100%,30%)'},
              infra: { logo:'building', borderColor:'hsl(0,0%,50%)'},
              logfin: { logo:'shopping-cart', borderColor:'hsl(52,100%,51%)'},
              mco: { logo:'cogs', borderColor:'hsl(200,29%,60%)'},
              prodef: { logo:'shield-alt', borderColor:'hsl(101,33%,36%)'},
              pam: { logo:'briefcase', borderColor:'hsl(30,75%,30%)'},
              pc: { logo:'users', borderColor:'hsl(288,59%,58%)'},
              pil: { logo:'exclamation-circle', borderColor:'hsl(240,100%,10%)'},
              'service_courant': { logo:'tasks', borderColor:'hsl(62,61%,44%)'},
              secu: { logo:'fire-extinguisher', borderColor:'hsl(0,100%,50%)'},
              secre: { logo:'envelope', borderColor:'hsl(160,100%,30%)'},
              sst: { logo:'street-view', borderColor:'hsl(200,100%,30%'},
              ugm: { logo:'edit', borderColor:'hsl(200,100%,30%'},
              b2m: { logo:'ship', borderColor:'hsl(167,70%,90%)'}
          },
          balises: ['image', 'lien', 'lien1', 'lien2', 'lien3', 'mail1','mail2' ]
      },
    }
  },
  name: 'app',
  components: {
    // HelloWorld,
    entete,
    navbar,
    plan,
    events,
    coms
  },
  created: function () {
    // try to use localStorage
    // const localEcheances = localStorage.getItem('echeances')
    // if (localEcheances != null) {
    //   this.echeances = JSON.parse(localEcheances)
    // }
    this.getDatas()
    // function to fetch every X minutes
    // setInterval(() => this.getDatas(), 5000)
  },
  methods: {
    getDatas () {
      fetch("comsEcheances.xlsx")
      .then(response => response.arrayBuffer())
      .then(response => this.convertToJSON(response))
      // .then(response => this.events = this.convertToJSON(response))
      .then((response) => {
        this.echeances = this.createObject(response[0], false, true)
        this.comm = this.createObject(response[1], true, false)
        this.annuaire = this.createObject(response[2])
        // localStorage.setItem('echeances',JSON.stringify(this.echeances))
        // localStorage.setItem('comm',JSON.stringify(this.comm))
        // localStorage.setItem('annuaire',JSON.stringify(this.annuaire))
        })
    },
    convertToJSON (data) {
        // convert data to binary file
        // input : data from xls file
        // output : array of arrays with xls lines
        let testdata = new Uint8Array(data)
        let arr = new Array()

        const len = testdata.length
        for (let i = 0; i!= len; i++) {
            arr[i] = String.fromCharCode(testdata[i])
        }
        const bstr = arr.join("")

        // call XLSX
        const workbook = XLSX.read(bstr, {
            type : "binary",
            cellDates : true
        })

        // do something with workbook
        // store coms and event objects in array
        let jsonArray = []
        const namesLen = workbook.SheetNames.length
        for (let i = 1; i!= namesLen; i++) {
            const sheetName = workbook.Sheets[workbook.SheetNames[i]]
            const json = XLSX.utils.sheet_to_json(sheetName, {header:1})
            json.splice(0,1)
            jsonArray.push(json)
        }

        return jsonArray
    },
    createObject (array, coms = false, evt = false, domain = null) {
      // create object from array
      // input : array
      // output : object with coms or event elements
      //
      // retrieve the key names
      const keyNames = array[0]
      let objArray = []
      const len = array.length
      for (let i = 1; i != len; i++) {
          const objLen = array[i].length
          // create object for each line in the array
          let obj = {}
          obj.borderColor = ''
          obj.bodyView = false
          obj.annuaireView = true
          // fill the object with all the element in a particular array, except empty and STOP
          for (let j = 0; j != objLen; j++) {
            if (array[i][j]) {
                obj[keyNames[j]] = array[i][j]
            }
            // create domain array
            this.createDomainArray(obj)
            if (coms) {
              // replace the easy markup 
              this.replaceMarkup(obj)
              // create literal date - only for coms
              this.literalDate(obj)
            }
            // create domainString for classes
            // this.createDomainString(obj)
            if (evt) {
              // sort futurs events
              this.sortEcheance(obj)
              // create html for events
              this.createEventsHTML(obj)
            }
            if (obj.domains.length !== 0) {
              // obj.color = this.devChoices.domainsDict['cdt'].color
              obj.borderColor = this.devChoices.domainsDict[obj.domains[0]].borderColor
            } else {
              obj.borderColor = 'lightgray'
            }
          }
          // store each object in array
          if (domain) {
            // push only the corresponding object because it's for a specific page
            for (const key of Object.keys(obj)) {
                key === domain ? objArray.push(obj) : null
            }
          } else {
            // push all object in array because it's for the main page
            objArray.push(obj)
          }
          // sort array by date, echeance or nom
          objArray.sort((a, b) => b.Date - a.Date)
          objArray.sort((a, b) => a.Echeance - b.Echeance)
          // use > for string, and - for numbers
          // objArray.sort((a, b) => a.nom > b.nom)
      }
      return objArray
    },
    createEventsHTML (object) {
      object.html = object.Texte
      if (object.lien) {
        object.html = `<a href="${object.lien}" target="_blank">${object.Texte}</a>`
      }
      if (object.commentaire) {
        object.html = `<abbr title=${object.commentaire}>${object.html}</abbr>`
      }
    },
    sortEcheance (object) {
      // sort the event depending of its echeance : past, today, this week, this month, next month, futur
      // input : evt object with echeance date object
      // output : event object with sorting attributes
      // calculate time since today
      const timeline = object.Echeance - new Date()
      // sort depending of time since today (use milliseconds)
      if (timeline < -24*3600*1000) {
      object.sorted = 'past'
      } else if (timeline < 0 && timeline > -24*3600*1000) {
              object.sorted = 'today'
      } else if (timeline > 0 && timeline < 24*3600*1000) {
      object.sorted = 'tomorrow'
      } else if (timeline > 24*3600*1000 && timeline < 48*3600*1000) {
              object.sorted = 'afterTomorrow'
      } else if (timeline > 48*3600*1000 && timeline < 7*24*3600*1000) {
      object.sorted = 'thisWeek'
      } else if (timeline > 7*24*3600*1000 && timeline < 14*24*3600*1000) {
      object.sorted = 'nextWeek'
      } else if (timeline > 14*24*3600*1000 && timeline < 30*24*3600*1000) {
              object.sorted = 'thisMonth'
      } else {
      object.sorted = 'futur'
      }
    },
    // createDomainString (object) {
    //     // input : object with some attributes filled with something not space
    //     // output : object with domains attribute (domains : sst, pam, cdt)
    //     object.domains = ''
    //     for (const attr in object) {
    //         if (this.devChoices.domaines.indexOf(attr) !== -1) {
    //             if (/\S/.test(object[attr])) {
    //             object.domains += `${attr} `
    //             }
    //         }
    //     }
    // },
    createDomainArray (object) {
        // input : object with some attributes filled with something not space
        // output : object with array domains attribute (domains : sst, pam, cdt)
        object.domains = []
        for (const attr in object) {
            if (this.devChoices.domaines.indexOf(attr) !== -1) {
                if (/\S/.test(object[attr])) {
                    object.domains.push(attr)
                }
            }
        }
    },
    replaceMarkup (obj) {
      // replace easy markup in obj.texte with real
      // input : object
      // output : object
      for (const el of this.devChoices.balises) {
        const search = `<${el}>`
        let completeMarkup = ''
        if (el === 'image') {
          completeMarkup = `<img src="${obj.image}" style="width:100%">`
        } else if (/lien/.test(el)) {
          completeMarkup = `<a href="${obj[el]}" target="_blank">`
        } else if (/mail/.test(el)) {
          completeMarkup = `<a href="mailto:${obj[el]}">`
        }
        // remove parasiting " due to excel
        //object.Texte = object.Texte.split('"').join('')
        // replace the elements
        if (obj.Texte && obj[el]) {
          obj.Texte = obj.Texte.split(search).join(completeMarkup)
          // close the markups
          obj.Texte = obj.Texte.split(`</${el}>`).join('</a>')
        }
      }
    },
    literalDate (object) {
      // transform date Object to an string date
      // input : com object with date object
      // output : com object with literal date
      if (object.Date) {
      let literalDate = `${object.Date.getDate()} ${this.devChoices.months[object.Date.getMonth()]} ${object.Date.getFullYear()}`
      object.literalDate = literalDate
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  display:grid;
  grid-template-areas: 
    "header header header"
    "navbar navbar navbar"
    "left center right"
    "footer footer footer";
    grid-template-columns: 17vw 67vw 15vw;
    grid-template-rows: 18vw 3vw 1fr 10vw;
}
</style>