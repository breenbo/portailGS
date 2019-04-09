<template>
    <div id="header" :style="{backgroundColor:services[$route.params.id].bcolor}">
        <h1>{{services[$route.params.id].nom}}</h1>
        <v-icon :name="services[$route.params.id].logo" scale="10" class="logo"/>
        <!-- <img id="logoSCA" src="../assets/logoSCATransparent.png"> -->
        <!-- <img id="logoSCA" :src=logosrc.dicom> -->
    </div>
</template>

<script>
export default {
    data () {
        return {
            services: {
                DICOM: {nom: 'Directeur', logo:'male', bcolor:'brown'},
                PIL:{nom:'Pilotage', logo:'tasks', bcolor:'purple'},
                SAF:{nom:'Service Achats Finances', logo:'shopping-cart', bcolor:'green'},
                SAP: {nom:'Service Administration du Personnel', logo:'address-card', bcolor:'grey'},
                SSC:{nom:'Service Soutiens Communs', logo:'car', bcolor:'black'},
                SSV:{nom:'Service Soutien Vie', logo:'bed', bcolor:'pink'},
                HSCT:{nom:'HSCT - Incendie', logo:'street-view', bcolor:'red'}
            }
        }
    }
}
</script>

<style scoped>
    h1 {
        font-size : 5vw;
        color:yellow;
        border-bottom:solid 6px yellow;
    }
    #header {
        grid-area: header;
        text-align:left;
        padding-left:12vw;
        background-color: brown;
        display:grid;
        grid-template-columns: 4fr 1fr;
        border:solid 1px blue;
        align-items: center;
    }
    .logo {
        float:right;
        color:yellow;
    }
</style>

