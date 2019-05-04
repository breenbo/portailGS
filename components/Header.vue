<template>
  <div id="header" :style="{backgroundColor:headerBackColor}">
    <h1 :style="{color:fontColor, borderColor:fontColor}"
        :data-text="services[$route.params.id].nom"
    >
        {{services[$route.params.id].nom}}
    </h1>
    <v-icon :name="services[$route.params.id].logo" :style="{color:fontColor}" scale="10" class="logo"/>
  </div>
</template>

<script>
import { devChoices } from "../mixins/devChoices"
import { colors } from "../mixins/colors"

export default {
  mixins:[devChoices, colors],
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
  align-items: center;
  z-index:99;
}
.logo {
  float: right;
  width:10vw;
}
</style>
