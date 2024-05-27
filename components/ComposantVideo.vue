<template>
    <v-row justify="center" class="pt-3" >
      <v-card class="ml-2 mb-5 radiusButton" color="black" :max-width="videoSize"  v-for="video in videos"
            :key="video.title"  @click="ShowVideo(video)">      
        <v-card-text>   
          <div class="video-container" :style="{ height: height}" >
            <video class="FormVideos" :style="{ height: height}" :poster="video.poster"> <!-- Utilisation de l'attribut poster -->> 
              <source :src="video.videoUrl" type="video/mp4" class="MainVideos">
            </video>
            <div class="video-duration" :style="{ bottom: bottom, right: right }">{{ formatDuration(video.duration) }}</div>
          </div>
        </v-card-text>

        <!-- Ajout de l'avatar ici -->

          <v-list class="mx-auto" >
            <v-list-item >

              <v-list-item-avatar>
                <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <div>{{video.title}}</div>  
                <div>{{video.name}}</div> 
                <div>{{video.vue}} vues - il y'a 1heure</div>
              </v-list-item-content>
  
          </v-list-item>
          </v-list> 
      
      </v-card>

    </v-row>
</template>

<script>
export default {
  name: 'ComposantVideo',
  props: {
    videos: Array,
    videoSize: {
      type: String,
      default: '340px', // Valeur par défaut
    },
    BorderBotom: {
      type: String,
      default: '340px', // Valeur par défaut
    },
    height: {
      type: String,
      default: '230px', // Valeur par défaut
    },
    
    bottom: {
      type: String,
      default: '8px', // Valeur par défaut
    }
    ,
    right: {
      type: String,
      default: '8px', // Valeur par défaut
    },

  },

  methods:{
    ShowVideo(videos)
    {
        this.$emit('send-value', videos);
    },
    formatDuration(durationInSeconds) {
        const mins = Math.floor(durationInSeconds / 60);
        const secs = durationInSeconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    },
  },
  
  

};
</script>

<style scoped>
    .radiusButton
    {
        border-top-left-radius: 12px;     /* Coin supérieur gauche */
        border-top-right-radius: 12px;    /* Coin supérieur droit */
        border-bottom-right-radius: 0px; /* Coin inférieur droit */
        border-bottom-left-radius: 0px;  /* Coin inférieur gauche */
        
    }

    .FormVideos {
    width: 320px;  /* Largeur fixe pour le conteneur vidéo */
    height: 230px; /* Hauteur fixe pour le conteneur vidéo */
    overflow: hidden; /* Masque les parties de l'image qui débordent */
    }


   video {
    width: 100%;    /* S'assure que la vidéo prend toute la largeur du conteneur */
    height: 100%;   /* S'assure que la vidéo prend toute la hauteur du conteneur */
    object-fit: contain; /* Couvre la zone de la vidéo sans distorsion de l'image du poster */
    }

    .video-container {
    position: relative;
    width: 320px;
    height: 230px;
    }

    .video-duration {
    position: absolute;
    bottom: 8px;  /* Distance from the bottom of the video container */
    right: 8px;   /* Distance from the right side of the video container */
    background-color: rgba(0, 0, 0, 0.75); /* Semi-transparent black background */
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.75rem; /* Smaller font size for duration */
    }

    



</style>