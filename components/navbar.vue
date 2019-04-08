<template>
    <div id="container">
        <div v-for="service in services" :key="service.id" class='title' :id="service.name">
            {{service.name}}<v-icon :name="service.logo" scale="1.5" class="logo"/>
        </div>
        <input type="text" v-model="searchInput" placeholder="Recherche cartes et échéances"/>
    </div>
</template>

<script>
export default {
    data () {
        return {
            searchInput:""
        }
    },
    props:['services']
}
</script>

<style scoped>
    #container {
        grid-area:navbar;
        background-color: blue;
        display:grid;
        grid-template-columns: repeat(8, 1fr) 20vw;
        align-items: center;
        position:sticky;
        top:0px;
        z-index:9;
    }
    .title {
        color:white;
        font-size: 1.5vw;
        padding-top:8px;
    }
    .title:hover {
        /* font-size:2vw; */
        border:solid 2px white;
    }
    .logo {
        margin-left:1vw;
    }
    input {
        margin:0 1vw;
        font-size:1.2vw;
        height:2vw;
    }
</style>