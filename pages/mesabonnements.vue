<template>
  <v-container class="d-flex justify-center align-center MainClass">
        <v-row class="mt-2">
          <AbonnerComponent />        
        </v-row>
  </v-container>
</template>
<style scoped>

.MainClass
{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

</style>

<script>
export default {
  name: 'mesabonnements',
  data() {
    return {
    }
  }
 
  
}
</script>
