<template>
    <div id="header">
        <h1>DICOM des Antilles</h1>
        <img id="logoSCA" src="../assets/logoSCATransparent.png">
    </div>
</template>

<style scoped>
    h1 {
        font-size : 5vw;
        color:hsl(48, 94%, 66%);
    }
    #header {
        grid-area: header;
        /* background-color: hsl(255, 68%, 22%); */
        background-color: hsl(234,62%,26%);
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

