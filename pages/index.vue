<template>
  <div>
    <OptionsButton @button-clicked="handleButtonClick" :marginTop="marginTop"/> 
    <ComposantVideo :videos="filteredAndLatestVideos" @send-value="handleVideo"/>
    <ComposantVideoMenu :videos="videos" @videoSelected="handleVideo" :Textcomposant="'Reprendre avec le profil de vialy'"/>
    <ComposantVideoMenu :videos="videos" @videoSelected="handleVideo" :Textcomposant="'Musculation'" :display="'none'" />
    <ComposantVideoMenu :videos="videos" @videoSelected="handleVideo"  :Textcomposant="'Football'" :display="'none'" />
  </div>
</template>

<script>
import OptionsButton from '../components/OptionsButton.vue';
export default {
  name: 'IndexPage',
  components:{
    OptionsButton
  },
  data() {
    return {
      marginTop:"0px",
      currentoption:1,

      videos: [ 
        { id:1, title: 'Exo Squads',playbackPercentage: 20,extraInfo: 'Top 10', name: 'vialy',vue:'20',categorie:1,videoUrl:'/song.mp4',poster: '/im1.jpeg',duration:20},
        { id:2, title: 'Musculation',playbackPercentage: 20,extraInfo: 'Top 10', name: 'mdi-cogs',vue:'20',categorie:1,videoUrl:'/song.mp4',poster: '/im2.jpeg',duration:20 },
        { id:3, title: 'Yonkwa Atombeu',playbackPercentage: 20,extraInfo: 'Top 10', name: 'mdi-cogs',vue:'20',categorie:2,videoUrl:'/song.mp4',poster: '/logo.png',duration:20 },
        { id:4, title: 'Exo SquadsZu',playbackPercentage: 20,extraInfo: 'Top 10', name: 'vialy',vue:'20',categorie:1,videoUrl:'/song.mp4',poster: '/im2.jpeg',duration:20 },
        { id:5, title: 'Musculation',playbackPercentage: 0,extraInfo: 'Top 10', name: 'mdi-cogs',vue:'20',categorie:3,videoUrl:'/song.mp4',poster: '/im1.jpeg',duration:20 },
        { id:6, title: 'Yonkwa Atombeu',playbackPercentage: 20,extraInfo: 'Top 10', name: 'mdi-cogs',vue:'20',categorie:3,videoUrl:'/song.mp4',poster: '/v.png',duration:20},
      ],

    }
  },

  methods: {
    handleButtonClick(value) {
      this.currentoption = parseInt(value, 10);
    },
    handleVideo(value)
    {
      this.$router.push({ name: 'SingleVideo', params: { videoData: value }});
    }
  },

  computed:{

    filteredAndLatestVideos() 
    {
      const filtered = this.videos.filter(video => video.categorie === this.currentoption);
      return filtered.slice(-3);
    }

   
 
  }
}
</script>
