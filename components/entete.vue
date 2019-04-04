<template>
    <div id="header">
        <h1>{{name.dicom}}</h1>
        <!-- <img id="logoSCA" src="../assets/logoSCATransparent.png"> -->
        <img id="logoSCA" :src=logosrc.dicom>
    </div>
</template>

<script>
export default {
    data : () => {
        return {
            name: {
                dicom :'DICOM - GSBdD des Antilles',
            },
            logosrc: {
                dicom : require('@/assets/logoSCATransparent.png')
            }
        }
    },
    props: ['products']
}
</script>

<style scoped>
    h1 {
        font-size : 5vw;
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
