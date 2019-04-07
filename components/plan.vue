<template>
    <div id="container">
        <h1>Plan</h1>
        <annuaire :annuaire="annuaire"></annuaire>
        <h2>Feuille de service</h2>
        <h2>Programme</h2>
        <h2>Organnuaire</h2>
        <h2>Trombinoscope</h2>
        <h2>Annuaire FAA</h2>
        <h2>Plan Desaix</h2>
    </div>
</template>

<script>
import annuaire from './annuaire.vue'

export default {
    components : {
        annuaire
    },
    props:['annuaire']
}
</script>

<style scoped>
    #container {
        grid-area: right;
        background-color: cyan;
    }
    h2 {
        text-align: left;
        padding-left:2vw;
    }
</style>
