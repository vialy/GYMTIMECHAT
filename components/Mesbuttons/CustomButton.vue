<template>
  <div>
    <button v-if="type=='text'" @click="openDialog" class="button" :type="type" :style="{ lineHeight: lineHeight , backgroundColor: backgroundColor, color: color,  }">{{ buttonText }}</button>
    <button v-else>
      <input  type="checkbox" />
    </button>
      <v-dialog
        v-model="dialog"  
        transition="dialog-bottom-transition"
        max-width="600"
      >
        
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Create Nouveau Programme</v-toolbar> 
            <v-card-text>
              <v-form id="basic-form" ref="form" @submit.prevent="submitForm" >
                <v-text-field label="Nom du Programme" :rules="[rules.required]" v-model="formData.Nom_Programme"></v-text-field>
                <v-text-field label="Date de début" type="date" :rules="[rules.required, rules.date]" v-model="formData.Date_debut"></v-text-field>
                <v-text-field label="Date de Fin" type="date" :rules="[rules.required, rules.duration]" v-model="formData.durer"></v-text-field>
                <v-btn type="submit"  color="#6700ea" class="align-right">Suivant</v-btn>
              </v-form>
            </v-card-text>
          
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    buttonText: {
      type: String,
      default: 'Enregistrer', // Valeur par défaut
    },
    lineHeight: {
      type: String,
      default: '30px', // Valeur par défaut du line-height
    },
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
        
      dialog: false,

      formData: {
        Nom_Programme: '',
        Date_debut: '',
        durer:'',
      },
      rules: {
        required: value => !!value || 'Ce champ est requis.',
        date: value => {
          const pattern = /^\d{4}-\d{2}-\d{2}$/;
          return pattern.test(value) || 'Entrez une date valide (AAAA-MM-JJ).';
        },
        duration: value => {
          const pattern = /^\d{4}-\d{2}-\d{2}$/;
          return pattern.test(value) || 'Entrez une date valide (AAAA-MM-JJ).';
        }
      }

    };
  },
  methods:{
    submitForm() {
    if (this.$refs.form.validate()) {
      this.$router.push({ name:'Monprogrammes', query: this.formData });
    } else {
      console.log('Correct errors before submitting.');
    }
  },
    openDialog() {
      this.dialog = true;
    }
  }

};
</script>

<style scoped>

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