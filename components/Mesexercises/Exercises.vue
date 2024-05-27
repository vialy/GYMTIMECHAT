<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="3" v-for="exercise in exercises" :key="exercise.id">
        <v-card class="mx-auto" outlined elevation="4">
          <v-img
            :src="exercise.image"
            class="white--text"
            height="150px" 
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title>{{ exercise.title }}</v-card-title>
          </v-img>
          <v-card-subtitle>{{ exercise.category }}</v-card-subtitle>
          <v-card-text class="pt-1">
            <div>{{ exercise.description }}</div>
            <div class="caption">Created: {{ exercise.date }}</div>
          </v-card-text>
          <v-card-actions class="justify-space-between pa-2">
            <v-btn icon @click="viewExercise(exercise.id)">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn icon @click="editExercise(exercise.id)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteExercise(exercise.id)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<style scoped>
.v-card {
  transition: box-shadow .25s ease;
  cursor: pointer;
  height: 100%; /* Assure que toutes les cartes ont la même hauteur */
}

.v-card:hover {
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.v-img {
  position: relative;
  overflow: hidden;
}

.v-card-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 0.5rem; /* Adjust padding as needed */
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background for better readability */
}

.v-card-subtitle {
  margin-top: -16px;
  padding: 0 12px;
}

.v-card-text {
  padding: 4px 12px 0;
  font-size: 0.875rem; /* Smaller font size for compact design */
}

.v-card-actions {
  padding: 4px 8px; /* Less padding for actions */
}
</style>


<script>
export default {
  name: 'Exercises',
  props: {
    exercises: Array,
  },
  methods: {
    viewExercise(id) {
      console.log(`Voir les détails de l'exercice ${id}`);
      // Navigate to exercise details page
    },
    editExercise(id) {
      console.log(`Modifier l'exercice ${id}`);
      // Open edit exercise form
    },
    deleteExercise(id) {
      console.log(`Supprimer l'exercice ${id}`);
      // Delete the exercise and update the list
    }
  }
};
</script>
