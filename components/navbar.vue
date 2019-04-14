<template>
    <div id="container">
        <router-link v-for="service in services" 
          :key="service.id" class="title" 
          :to="['Accueil'].indexOf(service.name) !== -1  ? '/' : service.name" 
          :id="service.name">
            {{service.name}}<v-icon v-if="service.logo" :name="service.logo" scale="1.5" class="logo"/>
        </router-link>
        <!-- <div class="title" @click="showLinks=!showLinks" @mouseenter="showLinks=true" @mouseleave="showLinks=false"> -->
        <div class="title" @mouseenter="showLinks=true" @mouseleave="showLinks=false">
            {{liens.name}}<v-icon :name="liens.logo" scale="1.5" class="logo"/>
            <transition name="dropdown">
                <div class="subMenu" v-if="showLinks">
                    <div v-for="lien in liens.subMenu" :key="lien.id">
                        <a :href=lien.link>{{lien.nom}}</a>
                    </div>
                </div>
            </transition>
        </div>
        <input type="text" v-model="search" @keyup="searchEdit"  placeholder="Recherche cartes et échéances"/>
    </div>
</template>

<script>
// import store from '../store'
import { EventBus } from '../eventBus'

export default {
    data () {
        return {
            search:'',
            searchRegexp : /(?:)/,
            showLinks:false
        }
    },
    props:['services', 'liens'],
    methods: {
        showSubMenu() {
            // service.show = !service.show
            this.showLinks = !this.showLinks
        },
        searchEdit() {
            this.searchRegexp = new RegExp(this.search, 'i')
            EventBus.$emit('searchEdit', this.searchRegexp)
        }
    },
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
        border-radius:30px;
    }
    .title:hover {
        border:solid 2px white;
    }
    .logo {
        margin-left:0.5vw;
    }
    .subMenu {
        /* display:none; */
        position:absolute;
        /* top:1vw; */
        right:16vw;
        min-width:10vw;
        margin-left:1.2vw;
        padding:1vw;
        border:solid 1px hsl(0,0%,85%);
        background-color: #fff;
        border-radius:4px;
        text-align:left;
        font-size:1.2vw;
        box-shadow : 0 24px 24px rgba(0, 0, 0, 0.2), 0 24px 24px rgba(0, 0, 0, 0.19);
    }
    input {
        margin:0 1vw;
        font-size:1.2vw;
        height:2vw;
    }
    .title {
        text-decoration: none;
        color:white;
    }
    .router-link-exact-active {
        background-color: red;
        border:solid 2px white;
    }
    .dropdown-enter-active, .dropdown-leave-active {
        transition : all 0.25s ease-out;
        transform-origin:top center;
    }
    .dropdown-enter, .dropdown-leave-to {
        transform: translateY(20px);
        /* transform: scaleY(0.7); */
        opacity:0;
    }
    .dropdown-leave, .dropdown-enter-to {
        opacity:1;
        transform: scaleY(1)
    }
</style>