<template>
  <div id="container">
      <h1>Communications</h1>
      {{dataBase}}
  </div>
</template>

<script>
export default {
    props:['dataBase']
}
</script>

<style>
  #container {
      grid-area: center;
      background-color: cyan;
  }
</style>
