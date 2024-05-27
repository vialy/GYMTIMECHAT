<template>
  <div class="mainclass">
  <v-col cols="12" md="8" lg="8" >
    <v-card 
      class="text-center text-black contens" 
      justify="center" 
      v-for="Subscriber in subscription" 
      :key="Subscriber.id"  
      @click="GoToSubscriber(Subscriber)">

      <v-card-text class="mt-4 text-black">
        <!-- Utiliser v-avatar pour l'image de profil -->
        <v-progress-circular value="70" size="100" width="6" color="black">
          <v-avatar size="75" class="avatarImg">
            <img :src="Subscriber.image" alt="John Smith" class="imageAvatarMessage"/>
          </v-avatar>
        </v-progress-circular>
        
        <h6>{{Subscriber.name}}</h6>

        <!-- Liens sociaux -->
        <div class="social-links mt-6">
          <v-btn icon>
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
        </div>

        <div class="text-caption mt-4">
          {{Subscriber.description}}
        </div>
      </v-card-text>
    </v-card>
  </v-col>  
</div>
</template>

<style scoped>

.contens {
  background-color: #6700ea;
  color: black !important;
  min-height: 50vh; /* Hauteur minimale pour la visibilité */
  margin: 10px; /* Ajoute de l'espace autour des cartes */
  transition: background-color 0.3s; /* Transition en douceur pour hover */
}

.contens:hover {
  background-color: grey; /* Changement de couleur au survol */
}

.avatarImg {
  position: relative;
  z-index: 1;
}

.imageAvatarMessage {
  width: 80px; /* Taille fixe pour les images */
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 10px; /* Espacement entre les icônes */
}

@media (max-width: 600px) {
  .mainclass {
    flex-direction: column; /* Empile les cartes verticalement sur petits écrans */
  }
}
</style>


<script>
export default {
 
  data() {
    return {
        
      subscription: [ 
        { id:1, name:'Yonkwa Vialy', title:'@LESOUTSIDERZ • 273 k abonnés • 1,5k vidéos', description:'Le foot aujourd\'hui est devenu une affaire d\'insiders. Les insiders se sont c...', subs:'Abonné',image:'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460' },
        { id:2, name:'LESOUTSIDERZ', title:'Vialy a • 273 k abonnés • 1,5k vidéos', description:'Le foot aujourd\'hui est devenu une affaire d\'insiders. Les insiders se sont c...', subs:'Abonné',image:'https://cdn.vuetifyjs.com/images/john.jpg' },
        
      ],

    };
  },
  methods:{

    GoToSubscriber(Subscriber)
    {

     this.$router.push({ name: 'MySubscribers', params: { SubscriberData: Subscriber }});
      
    }
  }

};
</script>
