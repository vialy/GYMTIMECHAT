<template>
    <div>
      <!-- Utilisation de CustomButton -->
        <v-icon   @click="openDialog" class="ButtonCircle CLICKME">mdi-plus-circle-outline</v-icon>
                
  
      <!-- Dialogue -->
      <v-dialog v-model="isDialogOpen" max-width="600px">
        <!-- Contenu du dialogue ici -->
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center mainHeader">
          <div class="text-h5 text-medium-emphasis ps-2 align-center">
            Envoyer le programme
          </div>
          <v-btn @click="openDialog" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

      


        <v-divider class="mb-4"></v-divider>

        <v-card-text>
          <v-col cols="12" >
            <v-card>
              <v-card-title>Tous les Exercises</v-card-title>        
                <v-card-text> 
                  <v-form class="formExo">
                    <v-text-field              
                      append-icon="mdi-magnify"         
                      label="Search..."   
                      solo      
                      dense 
                    ></v-text-field>             
                  </v-form>
                 
                    <v-row v-for="(exercise,index) in exercises"  :key="index" >
                      
                    <v-col cols="12" >
                        <v-card class="rounded-list-item">
                              <v-avatar class="avatarExo mr-2"> 
                                  <img :src="exercise.image" alt="exercise.name" size="40" class="imageText" />
                              </v-avatar>
                         

                          <v-radio-group v-model="selectedExerciseIndex" row>
                            <v-radio :value="index"></v-radio> {{ exercise.title }}
                          </v-radio-group>
                          
                        </v-card> 
                    </v-col>
                    </v-row>
               
              </v-card-text>
            </v-card>
          </v-col>
          </v-card-text>

        <v-divider class="mt-2"></v-divider>

        <v-card-actions class="my-2 d-flex justify-end">
          <v-btn class="text-none"  @click="openDialog">Annuler</v-btn>
          <v-btn class="text-none" color="#FB7F23" @click="AddMethod()">Ajouter</v-btn>
        </v-card-actions>

      </v-card>
      </v-dialog>
    </div>
  </template>

<script>
// import CustomButton from './CustomButton.vue';
export default {
  
    data() {
    return {
      isDialogOpen: false,  // Contrôle la visibilité du dialogue
      items: ['foo', 'bar', 'fizz', 'buzz'],
      table:[ ],
      value: ['foo', 'bar', 'fizz', 'buzz'],
      MobileActive:true,
      selectedExerciseIndex: null,
      exercises: [
          {
            id: 1,
            title: 'Squat',
            open:true,
            image: 'https://cdn.vuetifyjs.com/images/john.png',
            sets: [
              {  weight: '60', reps: '10', duration: '60' },
            ],
          },
          {
            id: 2,
            title: 'LEGS',
            open:true,
            image: 'https://cdn.vuetifyjs.com/images/john.png',
            sets: [
              { weight: '20', reps: '10', duration: '60' },
            ],
          },
        ],
        
    };
  },
  methods: {
    openDialog() {
      this.isDialogOpen = !this.isDialogOpen;  // Ouvre le dialogue
    },
    getSelectedExercise() {
    if (this.selectedExerciseIndex !== null) {
      return this.exercises[this.selectedExerciseIndex];
    }
    return null;
    },

    AddMethod()
    {
      // Récupérer l'exercice sélectionné
      const selectedExercise = this.getSelectedExercise();
      
      // Vérifier si un exercice est sélectionné
      if (selectedExercise) {
        // Ajouter l'exercice sélectionné à votre tableau ou à toute autre structure de données nécessaire
        this.table.push(selectedExercise);
        

        this.$emit('send-table', this.table);

         this.table = [];
        // Fermer le dialogue après l'ajout
        this.isDialogOpen = false;
      } else {
        // Afficher un message d'erreur ou gérer le cas où aucun exercice n'est sélectionné
        console.error("Aucun exercice sélectionné.");
      }

    },

    handleResize() 
      {
        if (window.innerWidth <= 768) {
        
        this.MobileActive = false;
        
        } else {
        this.MobileActive = true;
        }
      },


  }

  

  
};
</script>

<style scoped>

.Firscol
{
    height: 30vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 10px;   
}




/* efef */
.mainHeader
{
    background-color:#FB7F23;
    color: white;
}
.MainDialog
 {
    width: 80%;
    background-color: white;
    color: black;
    height: 20vh;
    transform: translate(15%, 10%);
    text-align: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    padding-top: 5px;
    margin-bottom: 20px;
 }


 .ButtonCircle
{
  background-color: #FB7F23;
  color: white;
  font-size: 30px;
  border-radius: 15px;
}

.CLICKME
{
  margin-top: 100px;
  font-size: 80px !important;
  cursor: pointer;
}
</style>