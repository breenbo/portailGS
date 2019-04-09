<template>
    <div id="header">
        <h1>DICOM - GSBdD des Antilles</h1>
        <!-- <img id="logoSCA" src="../assets/logoSCATransparent.png"> -->
        <!-- <img id="logoSCA" :src=logosrc.dicom> -->
        <img id="logoSCA" src="../assets/logoSCATransparent.png">
    </div>
</template>

<style scoped>
    h1 {
        font-size : 5vw;
        color:yellow;
    }
    #header {
        grid-area: header;
        background-color: brown;
        display:grid;
        grid-template-columns: 4fr 1fr;
        border:solid 1px blue;
        /* margin:-5vh; */
        align-items: center;
    }
    #logoSCA {
        width : 10vw;
        margin: 1vw;
    }
</style>

