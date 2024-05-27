<template>
  <div class="video-carousel-container hidden-lg-only">
    <div class="text-white pl-2 mytext">{{ Textcomposant }}</div>
    <v-slide-group class="video-carousel">
      <v-slide-item 
        v-for="(video, index) in videos"
        :key="index"
        class="video-item"
      >
        <div class="video-thumbnail-wrapper" @click="selectVideo(video)">
          <img :src="video.poster" class="video-thumbnail">
          <div class="video-progress-bar" :style="{ width: video.playbackPercentage + '%', display: display }"></div>
          <div class="video-overlay">
            <v-icon  v-if="video.playbackPercentage !=0" size="32" class="play-icon" :style="{ display: display }">mdi-play-circle-outline</v-icon>
          </div>
          <div class="video-details">
            <span class="video-title">{{ video.title }}</span>
            <!-- <span class="video-extra-info">{{ video.extraInfo }}</span> -->
          </div>
        </div>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
export default {
  name: 'VideoCarousel',
  props: {
    videos: {
      type: Array,
      default: () => [],
    },
    Textcomposant: {
      type: String,
      default: 'Categorie',
    },
    display: {
      type: String,
      default: 'block',
    }
  },
  methods: {
    selectVideo(video) {
      this.$emit('videoSelected', video);
    },
  },
};
</script>

<style scoped>
.video-carousel-container {
  padding: 16px 0;
}

.video-carousel-container:hover{
cursor: pointer;
}

.video-carousel {
  padding: 8px 0;
}

.video-item {
  margin-right: 12px;
}

.video-thumbnail-wrapper {
  position: relative;
  width: 100px; /* Adjust this to fit your design */
  height: 113px; /* Adjust this to fit your design */
}

.video-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover; /* This will make sure that the thumbnails are nicely cropped */
}

.video-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.play-icon {
  color: white;
}

.video-details {
  position: absolute;
  bottom: 10px;
  left: 8px;
}

.video-title {
  color: white;
  font-weight: bold;
  font-size: 0.75rem;
}

.video-extra-info {
  color: white;
  font-size: 0.55rem;
}

.video-progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 5px; /* Height of the progress bar */
  background-color: red; /* Color of the progress bar */
}

.mytext {
  font-weight: bold;
}

/* The first video item should have padding on the left */
.video-item:first-child {
  padding-left: 10px;
}
</style>
