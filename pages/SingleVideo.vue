<template>
  <v-row class="maincomponent">
    
    <v-col cols="12" sm="8" md="8" class="messageSent">
        <v-card class="inputMessage">      
            
            <div class="video-container">
              <video controls class="FormVideos"> <!-- Utilisation de l'attribut poster -->> 
                <source :src="videoInfo.videoUrl" type="video/mp4" class="MainVideos">
              </video>
            </div>
          

        <!-- Ajout de l'avatar ici -->

          <v-list class="VideoDetails" >
              <v-list-item >

                <v-list-item-avatar>
                  <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <div>{{videoInfo.title}}</div>  
                  <div>{{videoInfo.name}}</div> 
                  <div>{{videoInfo.vue}} vues - il y'a 1heure</div>
                </v-list-item-content>
    
              </v-list-item>
          </v-list> 
      
      </v-card>
      
      <CommentSection class="mt-2"/>


    </v-col>
    
    <v-col cols="12" sm="5" md="4" class="MesSousVideos">
      
        <div class="hidden-xs-only">
          <ComposantVideo @send-value="handleVideo" :videos="MyPrograms" :height="TailleVideo" :bottom="bottom" :right="right" :videoSize="programSize" class="mt-2"/>
        </div>
        
        <div class="hidden-lg-only">
          <ComposantVideoClick @send-value="handleVideo" :episodes="episodes"  class="mt-2 ml-6"/>    
        </div>
          
    </v-col>

  </v-row>
</template>

<style>

  .VideoDetails
  {
    margin-top: -15px;
    
  }
  .radiusButton
  {
      border-top-left-radius: 12px;     /* Coin supérieur gauche */
      border-top-right-radius: 12px;    /* Coin supérieur droit */
      border-bottom-right-radius: 0px; /* Coin inférieur droit */
      border-bottom-left-radius: 0px;  /* Coin inférieur gauche */
  }

  .inputMessage
  {
    position: relative;
    margin-top: 8px;
    margin-left: 10px;
  }

  .radiusButton
    {
        border-top-left-radius: 12px;     /* Coin supérieur gauche */
        border-top-right-radius: 12px;    /* Coin supérieur droit */
        border-bottom-right-radius: 0px; /* Coin inférieur droit */
        border-bottom-left-radius: 0px;  /* Coin inférieur gauche */
        
    }

    .FormVideos {
    width: 100%;    /* S'assure que la vidéo prend toute la largeur du conteneur */
    height: 10%;   /* S'assure que la vidéo prend toute la hauteur du conteneur */
    overflow: hidden; /* Masque les parties de l'image qui débordent */
    padding-top: -20px;
    }


   video {
    width: 100%;    /* S'assure que la vidéo prend toute la largeur du conteneur */
    height: 100%;   /* S'assure que la vidéo prend toute la hauteur du conteneur */
    object-fit: contain; /* Couvre la zone de la vidéo sans distorsion de l'image du poster */
    }

    .video-container {
    position: relative;
   
    }

    .MesSousVideos{

      margin-top: -12px !important;
      margin-left: -15px !important;
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

<script>
import ComposantVideo from '../components/ComposantVideo.vue';

export default {
  name: 'InspirePage',
  components:{
    ComposantVideo,

  },
  data() {
    return {
      videoInfo: {},
      videoSize: '840px',
      programSize: '300px',
      TailleVideo: '150px',   //Taille des mes sous videos
      bottom:'0px',
      right:'38px',

      

      MyPrograms: [ 
        { id:1, title: 'Exo Squads',playbackPercentage: 20,extraInfo: 'Top 10', name: 'vialy',vue:'20',categorie:1,videoUrl:'/song.mp4',poster: '/im1.jpeg',duration:20},
        { id:2, title: 'Musculation',playbackPercentage: 20,extraInfo: 'Top 10', name: 'mdi-cogs',vue:'20',categorie:1,videoUrl:'/song.mp4',poster: '/im2.jpeg',duration:20 },
        { id:3, title: 'Yonkwa AStombeu',playbackPercentage: 20,extraInfo: 'Top 10', name: 'mdi-cogs',vue:'20',categorie:2,videoUrl:'/song.mp4',poster: '/logo.png',duration:20 },
        { id:4, title: 'Exo SquadsZ',playbackPercentage: 20,extraInfo: 'Top 10', name: 'vialy',vue:'20',categorie:1,videoUrl:'/song.mp4',poster: '/im2.jpeg',duration:20 },
        { id:5, title: 'MusculatiSon',playbackPercentage: 0,extraInfo: 'Top 10', name: 'mdi-cogs',vue:'20',categorie:3,videoUrl:'/song.mp4',poster: '/im1.jpeg',duration:20 },
        { id:6, title: 'Yonkwa AtoDmbeu',playbackPercentage: 20,extraInfo: 'Top 10', name: 'mdi-cogs',vue:'20',categorie:3,videoUrl:'/song.mp4',poster: '/v.png',duration:20},
          ],

      episodes: [
        { number: 1, name: 'Dexter', length: '53m', description: 'Dexter Morgan, expert médico-légal et tueur de criminels en liberté à ses heures perdues en liberté à ses heures perdues',image:'/im2.jpeg',playbackPercentage:60},

        { number: 2, name: 'LEGS', length: '5m', description: 'erdues en liberté à ses heures perdues Dexter Morgan, expert médico-légal',image:'/im1.jpeg',playbackPercentage:30 },
        // ... Plus d'épisodes ici
        ],
    };
  },
  mounted() {
    if (this.$route.params.videoData) {
    this.videoInfo = this.$route.params.videoData;
      
    }else {
    // Handle the case where no data is passed
    this.$router.push('/'); // Assurez-vous d'avoir une valeur par défaut appropriée
  }
  },
  
  
  methods:{
    formatDuration(durationInSeconds) {
        const mins = Math.floor(durationInSeconds / 60);
        const secs = durationInSeconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    },
    handleVideo(value)
    {
      alert(value.title);
    }
  }
}
</script>
