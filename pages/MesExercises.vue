<template>
    <v-container>
        <v-row class="MainClass"> 
          <v-col cols="12">
            <ExoHeader />
          </v-col>
          <v-col cols="12"> 
            <MesExo :exercises="exercises" />
          </v-col>
        </v-row>
    </v-container>

</template>

<script>
import ExoHeader from '@/components/Mesexercises/ExoHeader.vue';
import MesExo from '@/components/Mesexercises/Exercises.vue';

export default {
  name: 'MesExercises',
  components: {
    ExoHeader,
    MesExo
  },
  data() {
    return {
      exercises: [
        { id:1, name: 'Exo Squads', date: '2022-04-01', category: 'Catégorie 1', image: '/im1.jpeg', description: 'Top 10 des exercices', videoUrl:'/song.mp4' },
        { id:2, name: 'Musculation', date: '2022-04-02', category: 'Catégorie 1', image: '/im2.jpeg', description: 'Top 10 des exercices', videoUrl:'/song.mp4' },
        { id:3, name: 'Yonkwa Atombeu', date: '2022-04-03', category: 'Catégorie 2', image: '/logo.png', description: 'Top 10 des exercices', videoUrl:'/song.mp4' },
        { id:4, name: 'Exo SquadsZ', date: '2022-04-04', category: 'Catégorie 1', image: '/im2.jpeg', description: 'Top 10 des exercices', videoUrl:'/song.mp4' },
        { id:5, name: 'Musculation', date: '2022-04-05', category: 'Catégorie 3', image: '/im1.jpeg', description: 'Top 10 des exercices', videoUrl:'/song.mp4' },
        { id:6, name: 'Yonkwa Atombeu', date: '2022-04-06', category: 'Catégorie 3', image: '/v.png', description: 'Top 10 des exercices', videoUrl:'/song.mp4' },
      ],
    }
  },
}
</script>

<style scoped>

.MainClass
{
  background-color: white;
  color:black !important;
}

</style>
