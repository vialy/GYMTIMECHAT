<template>
    <div>
      <!-- Utilisation de CustomButton -->
      <button type='text' @click="openDialog" class="button" :type="type" :style="{ lineHeight: lineHeight , backgroundColor: backgroundColor, color: color,  }">{{ buttonText }}</button>
    
  
      <!-- Dialogue -->
      <v-dialog v-model="isDialogOpen" max-width="600px">
        <!-- Contenu du dialogue ici -->
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center mainHeader">
          <div class="text-h5 text-medium-emphasis ps-2 align-center">
            Envoyer le programme
          </div>
          <v-btn icon="mdi-close" variant="text" @click="openDialog"></v-btn>
        </v-card-title>

        <v-divider class="mb-4"></v-divider>

        <v-card-text>
          <div class="text-medium-emphasis mb-4">
            A qui souhaites-tu envoyer ce programme ? 
          </div>
          <div class="mb-2 MainDialog">

            <div> Creer le {{ currentDate }}</div>
            <div class="text-overline pt-3"> {{programName}}</div>
        
          </div>


        <div>
          <v-select
    v-model="selectedSubscription"
    :items="subscriptions"
    item-text="name"
    item-value="id"
    label="Mes abonnés"
    chips
    multiple
    class="mt-8"
  >
    <template v-slot:item="{ item }">
      <v-chip
        :key="item.id"
        class="ma-2"
        color="blue"
        dark
      >
        <v-avatar left>
          <img :src="item.image" alt="item.name">
        </v-avatar>
        {{ item.name }}
      </v-chip>
    </template>
  </v-select>
        </div>
          
          </v-card-text>

        <v-divider class="mt-2"></v-divider>

        <v-card-actions class="my-2 d-flex justify-end">
          <v-btn class="text-none"  @click="openDialog">Cancel</v-btn>
          <v-btn class="text-none" color="#FB7F23" @click="openDialog">Send</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
    </div>
  </template>

<script>
import SimpleButton from '@/components/Mesbuttons/SimpleButton.vue';
export default {
    components: {                                            
      SimpleButton
     
    },
    props: {
    buttonText: {
      type: String,
      default: 'Envoyer le programme', // Valeur par défaut
    },
    lineHeight: {
      type: String,
      default: '30px', // Valeur par défaut du line-height
    },
    
    programName :{
      type: String,
      default: 'Mon super Programme Youtube', // Valeur par défaut 
    }
    ,

    backgroundColor:
    {
      type: String,
      default: '#FB7F23',
    },

    type:
    {
      type: String,
      default: 'text',
    },

    color:
    {
      type: String,
      default: '#FFF',
    }

    // Vous pouvez ajouter d'autres propriétés ici si nécessaire
  },
    data() {
    return {
      isDialogOpen: false,  // Contrôle la visibilité du dialogue
      items: ['foo', 'bar', 'fizz', 'buzz'],
      value: ['foo', 'bar', 'fizz', 'buzz'],
      currentDate: '',
      selectedSubscription: [],
      subscriptions: [ 
        { id:1, name:'Yonkwa Vialy', title:'@LESOUTSIDERZ • 273 k abonnés • 1,5k vidéos', description:'Le foot aujourd\'hui est devenu une affaire d\'insiders. Les insiders se sont c...', subs:'Abonné', image:'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460' },
        { id:2, name:'LESOUTSIDERZ', title:'Vialy a • 273 k abonnés • 1,5k vidéos', description:'Le foot aujourd\'hui est devenu une affaire d\'insiders. Les insiders se sont c...', subs:'Abonné', image:'https://cdn.vuetifyjs.com/images/john.jpg' },
      ],
    };
  },
  methods: {
    openDialog() {
      this.isDialogOpen = !this.isDialogOpen;  // Ouvre le dialogue
    },
    getCurrentDate() {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1; // Les mois sont de 0 à 11, donc ajoutez 1
      const year = date.getFullYear();
      return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    }
    },
    created() {
      this.currentDate = this.getCurrentDate(); // Définit la date actuelle lors de la création du composant
    },
  
};
</script>

<style scoped>
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
</style>