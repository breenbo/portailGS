<template>
    <div id="header" :style="{backgroundColor:services[$route.params.id].color}">
        <h1>{{services[$route.params.id].nom}}</h1>
        <v-icon :name="services[$route.params.id].logo" scale="10" class="logo"/>
    </div>
</template>

<script>
export default {
    props:['services']
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
        grid-column-gap: 1vw;
        border:solid 1px blue;
        align-items: center;
    }
    .logo {
        float:right;
        color:yellow;
    }
</style>