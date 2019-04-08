<template>
    <div id="container">
        <div v-for="service in services" :key="service.id">
            <div class="title" @click="showSubMenu(service)">
                {{service.name}}<v-icon v-if="service.logo" :name="service.logo" scale="1.5" class="logo"/>
            </div>
            <div class="subMenu" v-if="service.subMenu" :id="service.name" v-show="service.show">
                <div v-for="lien in service.subMenu" :key="lien.id">
                    <a :href=lien.link>{{lien.nom}}</a>
                </div>
            </div>
        </div>
        <input type="text" v-model="searchInput" placeholder="Recherche cartes et échéances"/>
    </div>
</template>

<script>
export default {
    data () {
        return {
            searchInput:"",
        }
    },
    props:['services'],
    methods: {
        showSubMenu(name) {
            name.show = !name.show
        }
    }
}
</script>

<style scoped>
    #container {
        grid-area:navbar;
        background-color: blue;
        display:grid;
        grid-template-columns: repeat(9, 1fr) 20vw;
        grid-column-gap: 10px;
        align-items: center;
        position:sticky;
        top:0px;
        z-index:9;
        padding:0 0.5vw;
    }
    .title {
        color:white;
        font-size: 1.5vw;
        padding-top:8px;
        cursor: pointer;
    }
    .title:hover {
        /* font-size:2vw; */
        border:solid 2px white;
        border-radius:30px;
    }
    .logo {
        margin-left:0.5vw;
    }
    .subMenu {
        /* display:none; */
        position:absolute;
        top:3vw;
        margin-left:1.2vw;
        padding:1vw;
        border:solid 1px red;
        background-color: #fff;
        border-radius:4px;
        text-align:left;
        font-size:1.2vw;
    }
    input {
        margin:0 1vw;
        font-size:1.2vw;
        height:2vw;
    }
</style>