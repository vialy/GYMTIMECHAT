<template>
    <v-container class="episodes-container">
      <v-row>
        <v-col cols="12">
          <v-tabs vertical class="episode-tabs">
            <v-tab>Ajout recent</v-tab>
            <v-tab>Titres similaires</v-tab>
          </v-tabs>
  
          <v-card flat>
            <v-card-text>
              <div v-for="(episode, index) in episodes" :key="index" class="episode-item" @click="hello(episode)">
                <div class="episode-thumbnail">
                  <v-img :src="episode.image" class="img"></v-img>
                  <div class="video-progress-bar" :style="{ width: episode.playbackPercentage + '%' }"></div>
                  <v-icon class="play-icon">mdi-play-circle-outline</v-icon>
                </div>
                <div class="episode-details">
                  <div class="episode-number">{{ episode.number }}. {{ episode.name }}</div>
                  <div class="episode-length">{{ episode.length }}</div>
                  <div class="episode-description">{{ ReduireDescription(episode.description,8) }}</div>
                </div>
                <v-icon class="more-icon">mdi-chevron-down</v-icon>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'EpisodeList',
    props:{
        episodes:Array,
    },
    
    methods:{

        ReduireDescription(description,limit)
        {
            const words = description.split(" ");

            if(words.length > limit)
            {
                return words.slice(0,limit).join(" ") + "...." ;
            }

            return description;
        },
        hello(episode)
        {
          this.$router.push({ name: 'SingleVideo', params: { videoData: episode }});
        }
    }
  }
  </script>
  
  <style scoped>
  .episodes-container {
    background: #2c2c2c;
    color: white;
  }
  
  .episode-tabs {
    background: transparent;
    color: white;
  }
  .video-progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 5px; /* Height of the progress bar */
  background-color: red; /* Color of the progress bar */
}
  .season-title {
    font-size: 1.5rem;
    margin-bottom: 16px;
  }
  
  .episode-item {
    display: flex;
    margin-bottom: 16px;
    
  }
  
  .episode-thumbnail {
    position: relative;
    width: 100px;
    height: 130px;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    margin-right: 15px;
    border-radius: 10%;

  }
  .episode-thumbnail > .v-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ajuste l'image pour couvrir tout l'espace disponible sans la déformer */
}
  .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 2.25rem;
    
  }
  
  .episode-details {
    flex: 1;
  }
  
  .episode-number {
    font-weight: bold;
    margin-bottom: 4px;
  }
  
  .episode-length {
    font-size: 0.875rem;
    margin-bottom: 4px;
  }
  
  .episode-description {
    font-size: 0.875rem;
    font-weight: bold;
    color: black;
    margin-top: 12px;
  }
  
  .more-icon {
    color: white;
  }
  </style>
  