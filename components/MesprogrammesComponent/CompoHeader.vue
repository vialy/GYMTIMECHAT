<template>
    <div class="MenuTitle">
        <div class="programTitle">
            Prog.Fitness
        </div>
        <div class="programTitle2">
            <CustomInputButton :placeholder="'Rechercher un programme'" :background-color="'grey'" :color="'#FFF'" class="mr-4"/>
            <CustomButton :button-text="'Creer un nouveau programme'" />
        </div>
              
    </div>
 </template>
   
 <script>
 import CustomButton from '../Mesbuttons/CustomButton.vue';
 import CustomInputButton from '../Mesbuttons/CustomInputButton.vue';
 export default {
    name: 'CompoHeader',
    components: {                                            
        CustomButton,
        CustomInputButton,   
    },
   data() {
     return {
       
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
   