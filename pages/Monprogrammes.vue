<template>
  <v-container class="d-flex justify-center align-center MainClass">
    <v-row>
      <!-- Titre et info du programme(debut) -->
      <v-container>
        <v-row>
          <v-col cols="12"> 
              <v-list >       
                <v-list-item>
                        <v-list-item-content class="InputFilters">
                          <v-row no-gutters class="OutPutElements">
                          
                            <div class="Durée">
                                <span>Titre : </span>
                                  <input v-model="Program_title"
                                  placeholder="Nom du Programme"
                                  class="black-input pl-2"
                                  label="Red Input" type="text"/>
                                  
                                    <br>

                                  <div class="InDurée">
                                    <input v-model="startDate"
                                    placeholder="Date début"
                                    class="red-input pl-2"
                                    label="Red Input" type="text"/>
                                    @
                                  </div>

                                  <div class="InDurée">
                                        <input v-model="endDate"
                                        placeholder="Date Fin"
                                        class="red-input pl-2"
                                        label="Black Input" type="text"/>
                                        
                                  </div>
                            </div>
                          
                          

                            <div class="SendInfo">
                              <div class="OutFilters">        
                                <SimpleButton :button-text="'Enregistrer'"  />
                              </div>
                            
                            
                              <div class="OutFilters">
                                <EnvoyerProgram :programName="Program_title"/>
                              </div>
                            </div>
                           
                          </v-row>
                        </v-list-item-content>
                        
                </v-list-item>
              </v-list>
          </v-col>
        </v-row>
      </v-container>
      <!-- Titre et info du programme(Fin) -->


      <!-- Tous les jours du programme (debut) -->

      <v-container class="TroisiemeSection">
            <v-row>
              <v-col cols="12" sm="12" md="12"> 
                  <v-list>       
                    <v-list-item>
                            <v-list-item-content class="DaysFilters">                 
                              <v-row>
                                <v-sheet
                                  class="MyButtons"  
                                >                           
                                    <v-slide-group no-arrows>           
                                      <v-slide-item v-for="(day, index) in days" :key="index">
                                        <div class="Days"> 
                                          <button type='text' class="button" 
                                            :class="{'button-active': isClick == index}" 
                                            @click="toogleId(index)"  
                                            :style="{ lineHeight: '30px' , backgroundColor: '#FB7F23', color: '#FFF',  }">
                                            {{ `Jour ${index + 1}` }}
                                          </button>
                                        </div>
                                      </v-slide-item>
                                    </v-slide-group>
                                  </v-sheet>
                              </v-row>   
                            </v-list-item-content>
                            
                    </v-list-item>
                  </v-list>
              </v-col>
              </v-row>
      </v-container>

      <!-- Tous les jours du programme (debut) -->
      






      <!-- Tous les exercise + Search bar + depot (debut) -->

      <v-container>
        <v-row justify="center">

          <!-- Tous les exercise + Search bar (debut) -->

          <v-col cols="12" sm="10" md="4"  v-if="this.MobileActive">
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
                  <draggable 
                    v-model="exercises" 
                    group="exercises" 
                    class="drag-area Firscol" 
                     >
                    <v-row v-for="(exercise) in exercises" :key="exercise.id" >
                    <v-col cols="12">
                        <v-card class="rounded-list-item">
                              <v-avatar class="avatarExo">
                                  <img :src="exercise.image" alt="exercise.name" size="40" class="imageText" />
                              </v-avatar>
                          <span class="exerciseText">{{ exercise.title }}</span>
                          <v-icon class="dot-end">mdi-apps</v-icon>
                          
                          
                        </v-card>
                    </v-col>
                    </v-row>
                </draggable>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Tous les exercise + Search bar (fin) -->



          <!-- Tous les exercise depot (debut) -->

            <v-col cols="12" sm="10" md="8">
              <v-card>
             
                <SidebarHeader/>  
                    <!-- Le reste de votre contenu de carte ici -->        
                <v-card-text v-if="this.MobileActive" > 
                  <draggable  v-model="otherItems" group="exercises" class="drag-area" @start="dragStart" @end="dragEnd">
                    <v-row v-for="(exercise, index) in otherItems" :key="'item'+ exercise.id">
                      <v-col cols="12" class="MainExercise">
                        <v-card>   
                          <v-card-title>
                            <v-row no-gutters class="RowExo">
                              <v-col cols="1" class="d-flex align-center">
                                <v-avatar class="avatarExo">
                                  <img :src="exercise.image" alt="exercise.name" />
                                </v-avatar>
                              </v-col>
                              <v-col cols="11" class="d-flex align-center ExerciseInfo">
                                <div>
                                  <input v-model="exercise.input" placeholder="1x" class="sameText ExInput white-background pl-3"/>
                                  <span>{{ exercise.title }}</span>
                                </div>
                                <div>
                                  <v-icon class="MonIcon" v-if="exercise.open" @click="toggleCard(index)">mdi-arrow-down-drop-circle</v-icon>
                                  <v-icon class="MonIcon" v-else @click="toggleCard(index)">mdi-arrow-up-drop-circle</v-icon>
                                  <v-icon class="MonIcon" @click="isDialogOpen = true" >mdi-close-circle</v-icon>
                                </div>
                              </v-col>
                            </v-row>
                          </v-card-title>

                          <v-dialog v-model="isDialogOpen" max-width="600px">
                            <v-card>
                              <v-card-title class="justify-space-between">
                                Voulez-vous supprimer ce programme?
                                <v-btn icon @click="closeDialog(index)">
                                  <v-icon>mdi-close</v-icon>
                                </v-btn>
                              </v-card-title>
                              <v-card-text>
                                Créé le 22/03/2024 - {{ exercise.title }}
                              </v-card-text>
                              <v-card-actions>
                                <v-btn text @click="closeDialog(index)">Annuler</v-btn>
                                <v-btn text color="red" @click="deleteExercise(index)">Supprimer</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                            

                          <v-card class="ensem" v-if="exercise.open" >   
                            <v-card-title class="listItem">  
                                <v-list >       
                                  <v-list-item        
                                          v-for="(set, setIndex) in exercise.sets"    
                                          :key="setIndex"   
                                        >
                                          <v-list-item-content class="ExoFilters">
                                            <v-row no-gutters class="mb-2 flex">
                                              <v-col  cols="1" class=" d-flex">
                                                {{ setIndex + 1 }}.
                                              </v-col>
                                              
                                                <div class="InputFilters">
                                                  <span>Poids</span>
                                                    <input v-model="set.weight"
                                                    :name="'exercises[${index}].sets[${setIndex}].weight'"
                                                    placeholder="0"
                                                    class="white-input pl-2"
                                                    label="White Input" type="text"/>
                                                  <span class="FormatUnit">Kg</span>   
                                                </div>
                                            
                                          
                                              
                                                <div class="InputFilters">
                                                  <span>Réps</span>  
                                                    <input v-model="set.reps"   
                                                    :name="'exercises[${index}].sets[${setIndex}].reps'"    
                                                    placeholder="0"   
                                                    class="white-input pl-2"  
                                                    label="White Input" type="text"/>
                                                </div>
                                              
                                              
                                                <div class="InputFilters">
                                                  <span>Durée</span>
                                                    <input v-model="set.duration"
                                                    :name="'exercises[${index}].sets[${setIndex}].duration'"
                                                    placeholder="0"
                                                    class="white-input pl-2"
                                                    label="White Input" type="text"/>
                                                    <span class="FormatUnit">sec</span> 
                                                  
                                                </div>
                                            
                                              <v-col cols="1" class="d-flex justify-end">
                                                <v-icon @click="removeSet(exercise, setIndex)" class="ExoClose" >mdi-close-octagon</v-icon>
                                              </v-col>
                                            </v-row>
                                          </v-list-item-content>
                                          
                                  </v-list-item>
                                </v-list>

                                <v-card-actions class="AjoutSeries" justify="center">
                                  
                                    <v-icon @click="addSet(exercise)" class="ButtonCircle">mdi-plus-circle-outline</v-icon>
                                  
                                </v-card-actions>
                            </v-card-title>
                          </v-card>


                        </v-card>
                      </v-col>
                    </v-row>
                  </draggable>
                </v-card-text>


                <v-card-text v-else>

                  <v-row justify="center" v-if="otherItems.length<=0">
                    <div class="nodata">
                        <AddProgram @send-table="NewProgram" />
                    </div>
                  </v-row>

                  <v-row  v-else v-for="(exercise, index) in otherItems" :key="'item'+ exercise.id">
                      <v-col cols="12" class="MainExercise">
                        <v-card>   
                          <v-card-title>
                            <v-row no-gutters class="RowExo">
                              <v-col cols="1" class="d-flex align-center">
                                <v-avatar class="avatarExo">
                                  <img :src="exercise.image" alt="exercise.name" />
                                </v-avatar>
                              </v-col>
                              <v-col cols="11" class="d-flex align-center ExerciseInfo">
                                <div>
                                  <input v-model="exercise.input" placeholder="1x" class="sameText ExInput white-background pl-3"/>
                                  <span>{{ exercise.title }}</span>
                                </div>
                                <div>
                                  <v-icon class="MonIcon" v-if="exercise.open" @click="toggleCard(index)">mdi-arrow-down-drop-circle</v-icon>
                                  <v-icon class="MonIcon" v-else @click="toggleCard(index)">mdi-arrow-up-drop-circle</v-icon>
                                  <v-icon class="MonIcon" @click="isDialogOpen = true" >mdi-close-circle</v-icon>
                                </div>
                              </v-col>
                            </v-row>
                          </v-card-title>

                          <v-dialog v-model="isDialogOpen" max-width="600px">
                            <v-card>
                              <v-card-title class="justify-space-between">
                                Voulez-vous supprimer ce programme?
                                <v-btn icon @click="closeDialog(index)">
                                  <v-icon>mdi-close</v-icon>
                                </v-btn>
                              </v-card-title>
                              <v-card-text>
                                Créé le 22/03/2024 - {{ exercise.title }}
                              </v-card-text>
                              <v-card-actions>
                                <v-btn text @click="closeDialog(index)">Annuler</v-btn>
                                <v-btn text color="red" @click="deleteExercise(index)">Supprimer</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                            

                          <v-card class="ensem" v-if="exercise.open" >   
                            <v-card-title class="listItem">  
                                <v-list >       
                                  <v-list-item        
                                          v-for="(set, setIndex) in exercise.sets"    
                                          :key="setIndex"   
                                        >
                                          <v-list-item-content class="ExoFilters">
                                            <v-row no-gutters class="mb-2 flex">
                                              <v-col  cols="1" class=" d-flex">
                                                {{ setIndex + 1 }}.
                                              </v-col>
                                              
                                                <div class="InputFilters">
                                                  <span>Poids</span>
                                                    <input v-model="set.weight"
                                                    :name="'exercises[${index}].sets[${setIndex}].weight'"
                                                    placeholder="0"
                                                    class="white-input pl-2"
                                                    label="White Input" type="text"/>
                                                  <span class="FormatUnit">Kg</span>   
                                                </div>
                                            
                                          
                                              
                                                <div class="InputFilters">
                                                  <span>Réps</span>  
                                                    <input v-model="set.reps"   
                                                    :name="'exercises[${index}].sets[${setIndex}].reps'"    
                                                    placeholder="0"   
                                                    class="white-input pl-2"  
                                                    label="White Input" type="text"/>
                                                </div>
                                              
                                              
                                                <div class="InputFilters">
                                                  <span>Durée</span>
                                                    <input v-model="set.duration"
                                                    :name="'exercises[${index}].sets[${setIndex}].duration'"
                                                    placeholder="0"
                                                    class="white-input pl-2"
                                                    label="White Input" type="text"/>
                                                    <span class="FormatUnit">sec</span> 
                                                  
                                                </div>
                                            
                                              <v-col cols="1" class="d-flex justify-end">
                                                <v-icon @click="removeSet(exercise, setIndex)" class="ExoClose" >mdi-close-octagon</v-icon>
                                              </v-col>
                                            </v-row>
                                          </v-list-item-content>
                                          
                                  </v-list-item>
                                </v-list>

                                <v-card-actions class="AjoutSeries" justify="center">
                                  
                                    <v-icon @click="addSet(exercise)" class="ButtonCircle">mdi-plus-circle-outline</v-icon>
                                  
                                </v-card-actions>
                            </v-card-title>
                          </v-card>


                        </v-card>
                      </v-col>
                    </v-row>











                  <!-- Button ajouter -->
                  <div class="TheprogramButton">
                    <AddProgram  @send-table="NewProgram" v-if="otherItems.length>0" />
                  </div>
                </v-card-text>

              </v-card>
            </v-col>

          <!-- Tous les exercise depot (fin) -->

        </v-row>
      </v-container>

  <!-- Tous les exercise + Search bar + depot (fin) -->





































  


</v-row>
</v-container>
</template>
<style scoped>

.v-icon.MonIcon
{
  background-color: white !important;
  color: black !important;
}
.ExerciseInfo
{
  display: flex;
  justify-content: space-between;
  margin-top: -5px;
}


/* testing */


.TheprogramButton
{
margin-left: 100px;
}
.nodata
{
  height: 58vh;
}

.LeftSide
{
  display: flex;
  justify-content: end;
}

.ExoClose
{
  font-size: 25px;
  margin-top: 10px;
  color: #FB7F23;
}
.AjoutSeries
{
  justify-content: center;
}
.ButtonCircle
{
  background-color: #FB7F23;
  color: white;
  font-size: 30px;
  border-radius: 15px;
}
.Vcon
{
  padding: 5px;
  
}
.ExoImage
{
  line-height:30px;
}
.inputFormExo
{
  position: relative;
  background-color: white;
  height: 50px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.18); /* Légère ombre */
  padding: 20px; /* Ajoutez un rembourrage pour séparer le contenu du bord */
  border-top-right-radius: 10px;
  margin-left: -2px;
}
.RowExo
{
  background-color:#FFF;
  color: black !important;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding-top:10px;
}
.sameText
{
  display: inline-block;
}
.ExInput
{
  background-color: white;
}

/* Personnalisation de la barre de défilement pour les navigateurs Webkit */
::-webkit-scrollbar {
  width: 8px;/* Largeur de la barre de défilement */
  margin-left: 10px;
}

::-webkit-scrollbar-track {
    background: transparent; /* Couleur de fond de la piste de défilement */
  border-radius: 10px; /* Arrondi des angles */
}

::-webkit-scrollbar-thumb {
  background: #FB7F23; /* Couleur de fond du pouce de défilement */
  border-radius: 10px; /* Arrondi des angles */
}

::-webkit-scrollbar-thumb:hover {
  background: #FB7F23; /* Couleur de fond du pouce lors du survol */
}
/* Ajout d'un espace au début et à la fin de la scrollbar */

::-webkit-scrollbar-button:end:increment {
  display: block;
  height: 170px; /* Hauteur de l'espace au début et à la fin de la scrollbar */
  background: #fff; /* Couleur de fond de l'espace */
}
/* Personnalisation de la barre de défilement pour Firefox */
* {
  scrollbar-width: thin; /* 'auto' ou 'thin' */
  scrollbar-color: #b3b3b3 #f0f0f0; /* pouce et piste */
}

.formExo
{
    margin-bottom: 0px;
}

.Firscol
{
    height: 30vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 10px;   
}
.avatarExo
{
    max-height: 43px;
    width: 45px;
    border-top-left-radius: 17px;
    border-bottom-left-radius: 17px;
    border-bottom-right-radius: 0px;
    border-top-right-radius: 0px;
    background-color: white !important;
}
.white-background {
  background-color: white !important;
  line-height: 25px;
  width: 45px;
  color: black;
  margin-left: 20px;
  border-radius: 7px;
  margin-right: 7px;
  border: 2px solid #FB7F23;
  font-size: 15px;
}
.white-input {
  background-color: white;
  color: black;
  line-height: 30px;
  width:55px;
  margin-bottom: 8px;
  margin-right: 10px;
  margin-left: 3px;
  border-radius: 7px;
  border: 1px solid #FB7F23;
}
.black-input {
  background-color: white;
  color: black;
  line-height: 40px;
  width:170px;
  border-radius: 6px;
  border: 2px solid #6700ea;
}

.red-input {
  background-color: white;
  color: black;
  line-height: 30px;
  width:100px;
  border-radius: 6px;
  border: 1px solid #FB7F23;
}

.FormatUnit
{
  margin-left: -7px;
}
.InputFilters
{
  margin-right: 25px;
  width: 123px;
  font-size: 12px;
}
.MyButtons
{
  width: 450px;
}

.DaysFilters
{
  width: 100%;
}

.Days
{
  margin-left: 10px;
}

.Durée
{
  display:inline-block;
  margin-right: 10px;
}

.InDurée
 {
  display:inline-block;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 2px;
 }
 
.ExoFilters
{
  font-size: 14px;
  background-color: #6700ea;
}

.OutPutElements
{
  display: flex;
  justify-content: space-between;
}
.TroisiemeSection
{
  margin-top: -25px;
}
.SendInfo
{
  display: inline-flex;
}
.DaysInfo
{
  width: 100%;
}
.OutFilters
{
  margin-left: 15px;
}

.listItem
{
  display: block;
}

.MainClass
{
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

.dot-end
{
    float: right;
    padding-top: 10px;
    padding-right: 20px;
    color: #FB7F23;
}

.imageText
{
    width: 50px !important;
}
.exerciseText
{
  color: black !important;
  margin-left: 7px;
}
.drag-area 
{
  min-height: 300px; /* Ajustez selon vos besoins */
}

.firstLayerMain
{
  background-color: #6700ea;
  min-height: 112px;
}

.rounded-list-item 
{
  padding-top: 0.8px;
  border-radius: 10px; /* Ajustez le rayon selon votre design */
  background-color: white; /* Couleur de fond de l'élément */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Ombre portée pour l'effet de profondeur */
  margin-bottom: -13px; /* Espacement entre les éléments de la liste */
  line-height:10px;
  height: 45px;
}

.custom-drawer
{
  border:transparent;
}

.avatar-list
{
  width:200px;
}

.custom-transparent-button 
{
  background-color: transparent !important; /* Rend le fond transparent */
  box-shadow: none !important; /* Retire l'ombre, si nécessaire */
  margin-top:30px;
}

.button-active
{
  background-color: #6700ea !important;
  color: white;
}

.btn
{
  background-color: transparent;
  border: none;
}

.avatar-info
{
  display:inline-flex;
  height: 113px;
}

/* Button style here */

.button {
  background-color: #FB7F23;
  color: white;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 4px;
  font-weight: bold;
  letter-spacing: 1px;
  transition: background-color 0.1s ease;
  margin-bottom: 5px;
  /* Ajoutez ici le style de votre bouton */
}

.button:hover{
  background-color: #FFF;
  color: black;
}
/* Button style end */

@media (max-width: 600px) {
  .ma-classe {
    display: none;
  }
  
  .MyButtons
  {
    width: 300px;
  }
}
</style>

<script>
import SimpleButton from '@/components/Mesbuttons/SimpleButton.vue';
import draggable from 'vuedraggable';


export default {
  name: 'Monprogrammes',
  components:{
    SimpleButton,
    draggable
  },
  data() {
        return {
          SetId : 1,
          isDragging: false,
          isDialogOpen: false,  // Contrôle la visibilité du dialogue de la fermeture
          isClick:0,
          day:1,
          Program_title:'',
          MobileActive:true,
          startDate: '2022-01-01',
          endDate: '2022-01-5',
          exercises: [
          {
            id: 1,
            title: 'Squat',
            open:true,
            image: 'https://cdn.vuetifyjs.com/images/john.png',
            sets: [
              {  weight: '60', reps: '10', duration: '60' },
            ],
            day:1,
          },
          {
            id: 2,
            title: 'LEGS',
            open:true,
            image: 'https://cdn.vuetifyjs.com/images/john.png',
            sets: [
              { weight: '20', reps: '10', duration: '60' },
            ],
            day:1,
          },
        ],

      otherItems: [ ],

    };
  },   
        
    methods: {
       
      toogleId(index)
      {
        this.isClick = index; 
      },
    
      toggleCard(index) 
      {
        if (this.otherItems[index] && this.otherItems[index].sets) 
        {
          this.otherItems[index].open = !this.otherItems[index].open;
        }
    
      },

      addSet(exercise) 
      {
        
        exercise.sets.push({weight: '', reps: '', duration: '' });
        this.SetId++; 
        
      },

      removeSet(exercise, setIndex) 
      {
        exercise.sets.splice(setIndex, 1)
        this.NumberingIncrement--;
      },

      deleteExercise(index) 
      {
        this.otherItems.splice(index, 1)
        this.isDialogOpen = false;
      },

      dragStart(event) {
        // Logique à exécuter quand le drag commence
        console.log("Drag started", event);
      },
      dragEnd(event) {
        // Logique à exécuter quand le drag termine
        console.log("Drag ended", event);
      },
      
      NewProgram(table) 
      {
        // Ajoute chaque élément de `table` à `otherItems`
        this.otherItems.push(...table);
        
        // Pour vérifier ce qui est dans `otherItems` après l'ajout
        console.log(this.otherItems);
      },
      handleResize() 
      {
        if (window.innerWidth <= 768) {
       
        this.MobileActive = false;
        
        } else {
      
        this.MobileActive = true;
        }
      },

    },

    computed: { 

        days() 
        {
          const dates = [];
          const start = new Date(this.startDate);
          const end = new Date(this.endDate);
          const dayTime = 24 * 60 * 60 * 1000; // Nombre de millisecondes dans une journée

          for (let day = start; day <= end; day = new Date(day.getTime() + dayTime)) {
            dates.push(day.toISOString().slice(0, 10)); // Ajoute la date formatée au tableau
          }
          return dates;
        }
   
    },

  mounted() 
    {
      if (this.$route.query.Nom_Programme) {
      this.Program_title = this.$route.query.Nom_Programme;
      this.startDate = this.$route.query.Date_debut;
      this.endDate = this.$route.query.durer;
      // Assume endDate or other relevant data could be handled similarly
      }
      window.addEventListener('resize', this.handleResize);
      this.handleResize(); 
    },

    beforeUnmount() 
    {
      window.removeEventListener('resize', this.handleResize);
    }, 
}
 
</script>
