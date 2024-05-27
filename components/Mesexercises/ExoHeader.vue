<template>
    <div class="MenuTitle">
        <div class="programTitle">
            Nouveau Exercise
        </div>
        <div class="programTitle2">
            <CustomInputButton :placeholder="'Rechercher un exercise'" :background-color="'grey'" :color="'#FFF'" class="mr-4"/>
            <SimpleButton @click-changed="receivedIt" :button-text="'Creer un nouveau exercise'" />
        </div>
              
    </div>
 </template>
   
 <script>
 import SimpleButton from '../Mesbuttons/SimpleButton.vue';
 import CustomInputButton from '../Mesbuttons/CustomInputButton.vue';
 export default {
    name: 'CompoHeader',
    components: {                                            
        SimpleButton,
        CustomInputButton,   
    },
   data() {
     return {
       
   }
 
   
   
 },
 methods:{
    receivedIt()
    {
        this.$router.push('/NouveauExercise');
    }
 }
}
 </script>
   
   <style scoped>
   .MenuTitle
    {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
    }

    .programTitle
    {
        color: #FB7F23;
        margin-left: 30px;
        font-weight: bold;
        font-size: 25px;
        width: 40%;
        text-align: left;

    }
    .programTitle2
    {
        width: 55%;
    }
   </style>
   