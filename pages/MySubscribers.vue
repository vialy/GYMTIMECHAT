<template>
  <div :key="$route.fullPath">
    <SubsciberBar :info="subscriberData"/>     
    <ComposantVideoClick  :episodes="episodes" />   
  </div>
</template>

<script>
export default {
  name: 'MySubscribers',
  data() {
    return {
      subscriberData: {},
      defaultData: {
      id: 0,
      name: 'Nom par défaut',
      title: 'Titre par défaut',
      description: 'Description par défaut',
      subs: 'Abonné',
      image: 'https://cdn.vuetifyjs.com/images/john.jpg' // Assurez-vous que cette image existe dans vos assets
    },
      episodes: [
        { number: 1, length: '53m', description: 'Dexter Morgan, expert médico-légal et tueur de criminels en liberté à ses heures perdues en liberté à ses heures perdues',image:'/im2.jpeg',playbackPercentage:60,
        id:1, title: 'C\'est nouveaux ici Exo Squads',playbackPercentage: 20,extraInfo: 'Top 10', name: 'vialy',vue:'20',categorie:1,videoUrl:'/song.mp4',poster: '/im1.jpeg',duration:20
      },

        { number: 2, name: 'LEGS', length: '5m', description: 'erdues en liberté à ses heures perdues Dexter Morgan, expert médico-légal',image:'/im1.jpeg',playbackPercentage:30,
        id:1, title: 'Second Squads',playbackPercentage: 20,extraInfo: 'Top 10',vue:'20',categorie:1,videoUrl:'/song.mp4',poster: '/im1.jpeg',duration:20  
      },
          // ... Plus d'épisodes ici
        ],

        SubsInfo: [
        { id:1, name:'LESOUTSIDERZ', title:'@LESOUTSIDERZ • 273 k abonnés • 1,5k vidéos', description:'Le foot aujourd\'hui est devenu une affaire d\'insiders. Les insiders se sont c...', subs:'Abonné' },
      //   { id:2, name:'Yonkwa Atombeu', title:'@LESOUTSIDERZ • 273 k abonnés • 1,5k vidéos', description:'Le foot aujourd\'hui est devenu une affaire d\'insiders. Les insiders se sont c...', subs:'Abonné' },
      //   { id:3, name:'Vialy de joseph', title:'@LESOUTSIDERZ • 273 k abonnés • 1,5k vidéos', description:'Le foot aujourd\'hui est devenu une affaire d\'insiders. Les insiders se sont c...', subs:'Abonné' },
      // 
    ],

    }
  },

  mounted() {
    if (this.$route.params.SubscriberData) {
      this.subscriberData = this.$route.params.SubscriberData;
      
    }else {
    // Handle the case where no data is passed
    this.$router.push('/'); // Assurez-vous d'avoir une valeur par défaut appropriée
  }
  },

 


   
 
  
}
</script>
