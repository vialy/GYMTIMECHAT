<template>
    <v-container>
        <v-row class="MainClass"> 
          <v-col cols="12">
            <CompoHeader />
          </v-col>
          <v-col cols="12"> 
            <MesPrograms />
          </v-col>
        </v-row>
    </v-container>

</template>

<script>
import CompoHeader from '@/components/MesprogrammesComponent/CompoHeader.vue';
import MesPrograms from '@/components/MesprogrammesComponent/MesPrograms.vue';

export default {
  name: 'MesProgrammes',
  components: {
    CompoHeader,
    MesPrograms
  }
}
</script>

<style scoped>

.MainClass
{
  background-color: white;
  color:black !important;
}

</style>
