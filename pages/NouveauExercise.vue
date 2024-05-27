<template>
  <div>
    <v-form ref="form" @submit.prevent="submitForm">
    <v-container>
      <v-row class="ExerciseContent mt-3">
     
      <v-col cols="12" md="6">
        <v-card >
          <v-card-title>Nom de l'exercice</v-card-title>
          <v-card-text>
            <v-text-field :rules="[rules.required]" label="Nom de l'exercice" outlined dense></v-text-field>
            <v-textarea :rules="[rules.required]" label="Descriptif et exécution" outlined dense></v-textarea>
            <!-- Ici, ajoutez votre éditeur de texte riche si nécessaire -->
          </v-card-text>
        </v-card>
        
        <v-card class="mt-3 mb-3">
          <v-card-title>Image d'aperçu</v-card-title>
          <v-card-text>
            <!-- Affichage de l'aperçu de l'image -->
            <v-img 
              :src="imagePreviewUrl"
              aspect-ratio="1.2"
              class="mb-2 preview-image"
              height="200"  
              width="300"   
            ></v-img>

            <!-- Input pour sélectionner l'image -->
            <v-file-input
              label="Télécharger une image"
              prepend-icon="mdi-camera"
              accept="image/*"
              @change="previewImage"
              outlined
              clearable
            ></v-file-input>

          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Vidéo de l'exercice</v-card-title>
          <v-card-text>
            <!-- Emplacement pour le lecteur vidéo -->
            <video width="320" height="240" controls @error="handleVideoError" v-if="videoUrl">
              <source :src="videoUrl" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <!-- Boutons pour télécharger/supprimer la vidéo -->
            <div class="text-caption">
          <!-- Bouton qui, lorsqu'il est cliqué, déclenchera le champ de fichier caché -->
          <v-btn color="primary" @click="openFileDialog">Télécharger</v-btn>
          
          <!-- Champ de fichier caché qui réagit au clic du bouton -->
          
            <!-- Champ de fichier caché qui réagit au clic du bouton -->
          <input
            type="file"
            ref="fileInput"
            accept=".mp4"
            style="display: none"
            @change="handleFileUpload($event)"
          />
        </div>
            
            <div class="text-caption">
              Pour éviter toute erreur, on te recommande d'importer tes vidéos en format MP4.
            </div>
          </v-card-text>
        </v-card>
       
            <div class="text-caption mt-15 ml-15">
          <!-- Bouton qui, lorsqu'il est cliqué, déclenchera le champ de fichier caché -->
          <v-btn color="primary" @click="submitForm">Enregistrer</v-btn>

        </div>
            
     
      </v-col>
    
    </v-row>
  </v-container>
</v-form>
  </div>
</template>

<style scoped>
  
    .preview-image {
    width: 200px !important;  /* Largeur de l'image */
    height: 300px !important; /* Hauteur de l'image */
    object-fit: contain !important; /* Ajuste l'image pour couvrir l'espace disponible sans déformation */
    }
    .custom-drawer
    {
      border:transparent;
    }
    .avatar-list
    {
      width:200px;
    }
    .custom-transparent-button {
      background-color: transparent !important; /* Rend le fond transparent */
      box-shadow: none !important; /* Retire l'ombre, si nécessaire */
      margin-top:30px;
    }

    .btn
    {
      background-color: transparent;
      border: none;
    }
    
    .firstLayerMain{
      background-color: #6700ea;
      min-height: 112px;
    }
    
    .avatar-info
    {
      display:inline-flex;
      height: 113px;
    }
    @media (max-width: 600px) {
    .ma-classe {
      display: none;
    }
  }

</style>


<script>

export default {
  name: 'NouveauExercise',
  
  data() {
      return {
        nomExercice: '',            // Pour le champ de texte du nom de l'exercice
        descriptionExercice: '',    // Pour le champ textarea de description
        imagePreviewUrl: '',
        videoUrl:'',
        rules: {
          required: value => !!value || 'Ce champ est requis.',
        },
       
        videoSize: '340px',
        youtubeVideoId: '17PbLUjBzwo',
        
       
      }
    },

  methods: {

      validateForm() {
      this.$refs.form.validate(); // Ceci validera tous les champs du formulaire
      },
      submitForm() {
        if (this.$refs.form.validate()) { // Si tous les champs sont valides
          // Logique de soumission ici
          console.log('Formulaire soumis avec succès!');
        } else {
          console.log('Erreur de validation, vérifiez tous les champs.');
        }
      },
      handleVideoError(event) {
      console.error("Erreur lors du chargement de la vidéo:", event);
      },
      openFileDialog() {
      // Référence au champ de fichier caché et déclenche un clic dessus
      this.$refs.fileInput.click();
      },

      handleFileUpload(event) {
      const files = event.target.files;
      if (!files.length) return;

        
        const file = files[0];

       
        if (file.type !== 'video/mp4') {
          alert('Veuillez sélectionner un fichier vidéo .mp4');
          return;
        }

          // Création d'une URL pour le fichier vidéo
            this.videoUrl = URL.createObjectURL(file);
            console.log(this.videoUrl);

          // Forcer la réinitialisation de l'input
          event.target.value = '';
          if (!event.target.value) { // Si la réinitialisation simple ne fonctionne pas
            event.target.type = '';
            event.target.type = 'file'; // Reset type trick
          }

      },
      previewImage(file) {
      if (!file) {
        this.imagePreviewUrl = '';
        return;
      }
      this.imagePreviewUrl = URL.createObjectURL(file);
    },

  },


   
 
  
}
</script>
