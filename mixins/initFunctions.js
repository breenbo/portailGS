import XLSX from "xlsx";

export const createDatas = {
    methods: {
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
              evt || coms ? obj.color = this.services[obj.domains[len]].bgcolor : '';
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
          const domaines = Object.keys(this.services)
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
          for (const el of this.balises) {
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
              this.months[object.Date.getMonth()]
            } ${object.Date.getFullYear()}`;
            object.literalDate = literalDate;
          }
        }
    }
}
