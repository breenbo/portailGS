<template>
  <div id="header" :style="{backgroundColor:backgroundColor}">
    <h1 :style="{color:fontColor, borderColor:fontColor}">{{services[$route.params.id].nom}}</h1>
    <v-icon :name="services[$route.params.id].logo" :style="{color:fontColor}" scale="10" class="logo"/>
  </div>
</template>

<script>
export default {
  props: ["services"],
  computed : {
    fontColor() {
      return this.$route.params.id ? this.services[this.$route.params.id].fontColor : ""
    },
    backgroundColor() {
      return this.$route.params.id ? this.services[this.$route.params.id].bgcolor : ""
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 5vw;
  border-bottom: solid 6px;
  padding-bottom:10px;
}
#header {
  grid-area: header;
  text-align: left;
  padding-left: 12vw;
  background-color: brown;
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-column-gap: 1vw;
  border: solid 1px blue;
  align-items: center;
  z-index:99;
}
.logo {
  float: right;
  width:10vw;
}
</style>