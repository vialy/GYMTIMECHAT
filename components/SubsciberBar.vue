<template>
    <v-card class="subscriber-card">
      <v-row>
        <v-col cols="2" class="pl-4">
          <v-avatar size="56" class="channel-logo">
            <img :src="info.image" alt="">
          </v-avatar>
        </v-col>
    
        <v-col cols="8" class="channel-info">
          <div class="title">{{info.name}}</div>
          <div class="subtitle">
            <span>{{ info.title }}</span>
          </div>
          <div class="description">{{ info.description }}</div>
        

        <v-col cols="2">
              <v-btn color="green darken-3" dark class="subscribe-btn">{{ info.subs }} <v-icon right>mdi-chevron-down</v-icon></v-btn>
        </v-col>
      </v-col>

      </v-row>
    </v-card>
  </template>
  <script>
  export default {
    name: 'SubsciberBar',
    props:{
      info: {
      type: Object,
      required: true
    }
    },
    
  };
  </script>

  
<style scoped>
.subscriber-card {
  background-color: #202020; /* Fond sombre */
  color: white; /* Texte blanc */
  margin-top: 12px;
  padding-top: 30px;
  width: 99%;
  padding-bottom: 30px;
  margin-bottom: 10px;
  padding-left: 30px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}


.channel-logo img {
  border-radius: 20%; /* Rend l'image de l'avatar ronde */
  
}

.channel-info .title {
  font-size: 20px; /* Taille du titre */
  font-weight: bold; /* Texte en gras */
}

.channel-info .subtitle {
  font-size: 14px; /* Taille du sous-titre */
  opacity: 0.7; /* Sous-titre légèrement transparent */
}

.channel-info .description {
  font-size: 12px; /* Taille de la description */
  opacity: 0.6; /* Description légèrement transparente */
}

.subscribe-btn {
  font-size: 14px; /* Taille du texte du bouton */
  border: 1px solid rgba(255, 255, 255, 0.7); /* Bordure du bouton */
}
@media (max-width: 600px) {
  .subscriber-card {
  background-color: #202020; /* Fond sombre */
  color: white; /* Texte blanc */
  margin-top: -11px;
  margin-left: 0px;
  padding-top: 30px;
  padding-left: 0px;
  padding-bottom: 30px;
  margin-bottom: 10px;
  }
 
  .subscribe-btn {
  font-size: 12px; /* Taille du texte du bouton */
  border: 1px solid rgba(255, 255, 255, 0.7); /* Bordure du bouton */
  width: 80px !important;
  }
}
</style>
  