<template>
   <v-card-title v-if="otherItems.length === 0">
     Déposé tous les Exercises ICI      
   </v-card-title> 

   <v-card-title v-else>
     Mon programme d'entraînement  
   </v-card-title>

  </template>
  
  <script>

  export default {

    data () {
      return {
        otherItems: [
        
      ],
      }
    }
  }
  </script>
  
  