export const devChoices = {
    data () {
        return {
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
                nom: "Conseil Juridique",
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

    }
}
