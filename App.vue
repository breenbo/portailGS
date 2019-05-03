<template>
  <div id="app">
    <transition name="headerSlide" appear>
      <router-view name="header" :services="devChoices.services" :key="$route.params.id"></router-view>
    </transition>
    <navbar
       :services="devChoices.services"
       :liens="liens"
    >
    </navbar>
    <plan :annuaire="annuaire"
          :services="devChoices.services"
          :liensPlan="liensPlan"
    >
    </plan>
    <!-- pass annuaire for birthday card -->
    <router-view
      name="main"
      :echeances="echeances"
      :comm="comm"
      :devChoices="devChoices"
      :annuaire="annuaire"
      :referentiel="referentiel"
    >
    </router-view>
  </div>
</template>

<script>
import plan from "./components/plan.vue";
import navbar from "./components/navbar.vue";
import XLSX from "xlsx";
// import { setInterval } from 'timers';

export default {
  data() {
    return {
      echeances: [],
      comm: [],
      annuaire: [],
      liens:[],
      liensPlan:[],
      referentiel:[],
      meteo: [],
      devChoices: {
        months: [
          "janvier",
          "février",
          "mars",
          "avril",
          "mai",
          "juin",
          "juillet",
          "août",
          "septembre",
          "octobre",
          "novembre",
          "décembre"
        ],
        services: {
          accueil: {
            nom:"DICOM Antilles",
            logo: "",
            bgcolor: "lightgray" },
          DICOM: {
            nom: "Directeur",
            logo: "users",
            bgcolor: "#8B5D5D",
            fontColor:"hsl(0,0%,13%)",
            darkFontColor:"hsl(0,0%,13%)",
            supportColor:"hsl(360,67%,60%)",
            lightbgcolor:"#F0E9E9"
          },
          PIL: {
            nom: "Pilotage",
            logo: "tasks",
            // bgcolor: "hsl(295,85%,18%)",
            bgcolor: "hsl(261,68%,84%)",
            fontColor:"hsl(211,39%,23%)",
            darkFontColor:"hsl(211,39%,23%)",
            supportColor:"hsl(262,69%,61%)",
            // lightbgcolor:"hsl(295,58%,93%)",
            lightbgcolor:"hsl(262,61%,93%)"
          },
          BIL : {
            nom: "Bureau des Logements",
            logo: "home",
            bgcolor: "hsl(184,80%,54%)",
            fontColor:"hsl(42,15%,23%)",
            darkFontColor:"hsl(42,15%,23%)",
            supportColor:"hsl(360,71%,66%)",
            lightbgcolor:"hsl(184,100%,96%)"
            },
          C3J : {
            nom: "Contentieux Juridique",
            logo: "glasses",
            bgcolor: "hsl(83,55%,52%)",
            fontColor:"hsl(0,0%,23%)",
            darkFontColor:"hsl(0,0%,23%)",
            supportColor:"hsl(200,66%,69%)",
            lightbgcolor:"hsl(83,88%,94%)"
            },
          SAF: {
            nom: "Achats Finances",
            logo: "shopping-cart",
            bgcolor: "hsl(44,92%,63%)",
            fontColor:"hsl(0,0%,23%)",
            darkFontColor:"hsl(0,0%,23%)",
            supportColor:"hsl(162,63%,60%)",
            lightbgcolor:"hsl(49,100%,96%)"
          },
          SAP: {
            nom: "Administration du Personnel",
            logo: "address-card",
            bgcolor: "hsl(184,77%,34%)",
            fontColor:"hsl(42,15%,13%)",
            darkFontColor:"hsl(42,15%,13%)",
            supportColor:"hsl(42,78%,60%)",
            lightbgcolor: "hsl(186,100%,94%)"
          },
          SSC: {
            nom: "Soutiens Communs",
            logo: "car",
            bgcolor: "hsl(122,39%,41%)",
            fontColor:"hsl(0,0%,23%)",
            darkFontColor:"hsl(0,0%,23%)",
            supportColor:"hsl(360,67%,60%)",
            lightbgcolor: "hsl(125,65%,93%)"
          },
          SSV: {
            nom: "Soutien Vie",
            logo: "utensils",
            bgcolor: "hsl(14,89%,55%)",
            fontColor:"hsl(0,0%,23%)",
            darkFontColor:"hsl(0,0%,23%)",
            supportColor:"hsl(227,50%,59%)",
            lightbgcolor: "hsl(24,100%,93%)"
          },
          HSCT: {
            nom: "HSCT - Incendie",
            logo: "street-view",
            bgcolor: "hsl(360,67%,44%)",
            fontColor:"hsl(42,15%,13%)",
            darkFontColor:"hsl(42,15%,13%)",
            supportColor:"hsl(42,57%,55%)",
            lightbgcolor: "hsl(360,100%,97%)"
          }
        },
        balises: ["image", "lien", "lien1", "lien2", "lien3", "mail1", "mail2"]
      }
    };
  },
  name: "app",
  components: {
    navbar,
    plan
  },
  created: function() {
    // try to use localStorage
    // const localEcheances = localStorage.getItem('echeances')
    // if (localEcheances != null) {
    //   this.echeances = JSON.parse(localEcheances)
    // }
    this.getDatas();
    // function to fetch every X minutes
    // setInterval(() => this.getDatas(), 5000)
  },
  methods: {
    getDatas() {
      fetch("comsEcheances.xlsx")
        .then(response => response.arrayBuffer())
        .then(response => this.convertToJSON(response))
        .then(response => {
          this.echeances = this.createObject(response[0], false, true);
          this.comm = this.createObject(response[1], true, false);
          this.referentiel = this.createObject(response[2], false, false);
          this.annuaire = this.createObject(response[3]);
          this.liens = this.createObject(response[4], false, false);
          this.liensPlan = this.createObject(response[5], false, false);
          // localStorage.setItem('echeances',JSON.stringify(this.echeances))
          // localStorage.setItem('comm',JSON.stringify(this.comm))
          // localStorage.setItem('annuaire',JSON.stringify(this.annuaire))
        });
    },
    convertToJSON(data) {
      // convert data to binary file
      // input : data from xls file
      // output : array of arrays with xls lines
      let testdata = new Uint8Array(data);
      let arr = new Array();

      const len = testdata.length;
      for (let i = 0; i != len; i++) {
        arr[i] = String.fromCharCode(testdata[i]);
      }
      const bstr = arr.join("");

      // call XLSX
      const workbook = XLSX.read(bstr, {
        type: "binary",
        cellDates: true
      });

      // do something with workbook
      // store coms and event objects in array
      let jsonArray = [];
      const namesLen = workbook.SheetNames.length;
      for (let i = 1; i != namesLen; i++) {
        const sheetName = workbook.Sheets[workbook.SheetNames[i]];
        const json = XLSX.utils.sheet_to_json(sheetName, { header: 1 });
        json.splice(0, 1);
        jsonArray.push(json);
      }

      return jsonArray;
    },
    createObject(array, coms = false, evt = false, domain = null) {
      // create object from array
      // input : array
      // output : object with coms or event elements
      //
      // retrieve the key names
      const keyNames = array[0];
      let objArray = [];
      const len = array.length;
      for (let i = 1; i != len; i++) {
        const objLen = array[i].length;
        // create object for each line in the array
        let obj = {};
        evt || coms ? obj.color = "": '';
        obj.bodyView = false;
        // obj.annuaireView = true;
        // fill the object with all the element in a particular array, except empty and STOP
        for (let j = 0; j != objLen; j++) {
          if (array[i][j]) {
            obj[keyNames[j]] = array[i][j];
          }
          // create domain array
          this.createDomainArray(obj);
          if (coms) {
            // replace the easy markup
            this.replaceMarkup(obj);
            // create literal date - only for coms
            this.literalDate(obj);
            // create unique key for each object
            obj.key =
              obj.Titre + obj.Date.getDate() + j.toString() + i.toString();
          }
          if (evt) {
            // sort futurs events
            this.sortEcheance(obj);
            // create html for events
            this.createEventsHTML(obj);
            // create unique key for each object
            obj.key =
              obj.Texte + obj.Echeance.getDate() + j.toString() + i.toString();
          }
          const len = obj.domains.length - 1;
          evt || coms ? obj.color = this.devChoices.services[obj.domains[len]].bgcolor : '';
        }
        // store each object in array
        if (domain) {
          // push only the corresponding object because it's for a specific page
          for (const key of Object.keys(obj)) {
            key === domain ? objArray.push(obj) : null;
          }
        } else {
          // push all object in array because it's for the main page
          objArray.push(obj);
        }
        // sort array by date, echeance or nom
        objArray.sort((a, b) => b.Date - a.Date);
        objArray.sort((a, b) => a.Echeance - b.Echeance);
        objArray.sort((a,b) => a.nomLien > b.nomLien);
        // use > for string, and - for numbers
        // objArray.sort((a, b) => a.nom > b.nom)
      }
      return objArray;
    },
    createEventsHTML(object) {
      object.html = object.Texte;
      if (object.lien) {
        object.html = `<a href="${object.lien}" target="_blank">${
          object.Texte
        }</a>`;
      }
      if (object.commentaire) {
        object.html = `<abbr title=${object.commentaire}>${object.html}</abbr>`;
      }
    },
    sortEcheance(object) {
      // sort the event depending of its echeance : past, today, this week, this month, next month, futur
      // input : evt object with echeance date object
      // output : event object with sorting attributes
      // calculate time since today
      const timeline = object.Echeance - new Date();
      // sort depending of time since today (use milliseconds)
      if (timeline < -24 * 3600 * 1000) {
        object.sorted = "past";
      } else if (timeline < 0 && timeline > -24 * 3600 * 1000) {
        object.sorted = "today";
      } else if (timeline > 0 && timeline < 24 * 3600 * 1000) {
        object.sorted = "tomorrow";
      } else if (timeline > 24 * 3600 * 1000 && timeline < 48 * 3600 * 1000) {
        object.sorted = "afterTomorrow";
      } else if (
        timeline > 48 * 3600 * 1000 &&
        timeline < 7 * 24 * 3600 * 1000
      ) {
        object.sorted = "thisWeek";
      } else if (
        timeline > 7 * 24 * 3600 * 1000 &&
        timeline < 14 * 24 * 3600 * 1000
      ) {
        object.sorted = "nextWeek";
      } else if (
        timeline > 14 * 24 * 3600 * 1000 &&
        timeline < 30 * 24 * 3600 * 1000
      ) {
        object.sorted = "thisMonth";
      } else {
        object.sorted = "futur";
      }
    },
    createDomainArray(object) {
      // input : object with some attributes filled with something not space
      // output : object with array domains attribute (domains : sst, pam, cdt)
      object.domains = ["accueil"];
      const domaines = Object.keys(this.devChoices.services)
      for (const attr in object) {
        if (domaines.indexOf(attr) !== -1) {
        //if (this.devChoices.domaines.indexOf(attr) !== -1) {
          if (/\S/.test(object[attr])) {
            object.domains.push(attr);
          }
        }
      }
    },
    replaceMarkup(obj) {
      // replace easy markup in obj.texte with real
      // input : object
      // output : object
      for (const el of this.devChoices.balises) {
        const search = `<${el}>`;
        let completeMarkup = "";
        if (el === "image") {
          completeMarkup = `<img src="${obj.image}" style="width:100%">`;
        } else if (/lien/.test(el)) {
          completeMarkup = `<a href="${obj[el]}" target="_blank">`;
        } else if (/mail/.test(el)) {
          completeMarkup = `<a href="mailto:${obj[el]}">`;
        }
        // remove parasiting " due to excel
        //object.Texte = object.Texte.split('"').join('')
        // replace the elements
        if (obj.Texte && obj[el]) {
          obj.Texte = obj.Texte.split(search).join(completeMarkup);
          // close the markups
          obj.Texte = obj.Texte.split(`</${el}>`).join("</a>");
        }
      }
    },
    literalDate(object) {
      // transform date Object to an string date
      // input : com object with date object
      // output : com object with literal date
      if (object.Date) {
        let literalDate = `${object.Date.getDate()} ${
          this.devChoices.months[object.Date.getMonth()]
        } ${object.Date.getFullYear()}`;
        object.literalDate = literalDate;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1vw;
  text-align: center;
  color: #2c3e50;
  /* background-color: hsl(216, 33%, 97%); */
  margin: -10px;
  margin-top: -30px;
  /* margin-top: 60px; */
  display: grid;
  grid-template-areas:
    "header header header"
    "navbar navbar navbar"
    "left center right";
  grid-template-columns: 17vw 67vw 15.4vw;
  grid-template-rows: 20vw 3vw 80vh;
}
.headerSlide-enter,
.headerSlide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.headerSlide-leave,
.headerSlide-enter-to {
  opacity: 1;
}
.headerSlide-enter-active,
.headerSlide-leave-active {
  transition: all 0.6s ease-out;
}
.fa-icon {
  width: 1.6vw;
}
</style>
