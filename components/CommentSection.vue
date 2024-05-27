<template>
  <div>
    <div class="comment-section" @click="openDialog">
      <div class="comment-header">
        Commentaires <span class="comment-count">{{ comments.length }}</span>
      </div>
      <div v-if="comments.length > 0" class="comment-input-wrapper new">
        <div class="user-avatar">{{ comments[0].initial }}</div>
        <div>{{ comments[comments.length - 1].text }}</div>
      </div>
    </div>

    <v-dialog 
      v-model="dialog"  
      transition="dialog-bottom-transition"  
      fullscreen
    >

      <v-card style="background-color: white !important;">
        <v-toolbar dark color="black">
          <v-toolbar-title>Commentaires</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list class="OveralList">
          <div class="mainList">
            <v-list-item v-for="(comment, index) in comments" :key="index" class="comment-input-wrapper">
              <div class="user-avatar">{{ comment.initial }}</div>
              <div>{{ comment.text }}</div>
            </v-list-item>
          </div>
          <v-divider></v-divider>
          <v-list-item class="InputComments">
            <div class="comment-input-wrapper inputForm">
              <div class="user-avatar">V</div>
              <input type="text" class="comment-input" placeholder="Ajoutez un commentaire..."/>
            </div>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      comments: [

      { initial: 'M', author: '@MbekoTabula', text: 'L\'excellence sinon rien...\nAfro-noblesse oblige mon frère.\nLongue vie à toi' },
      { initial: 'D', author: '@dieduonnerzentutme8610', text: 'Powerfull' },
      { initial: 'B', author: '@bubulstyle9825', text: '05:45 😂😂😂 tu pars de Röissy à Nismalen 😂😂😂...\nPauvre Hermann...' },
      { initial: 'M', author: '@MbekoTabula', text: 'L\'excellence sinon rien...\nAfro-noblesse oblige mon frère.\nLongue vie à toi' },
      { initial: 'D', author: '@dieduonnerzentutme8610', text: 'Powerfull' },
      { initial: 'B', author: '@bubulstyle9825', text: '05:45 😂😂😂 tu pars de Röissy à Nismalen 😂😂😂...\nPauvre Hermann...' }

      ]
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
  },
};
</script>

<style scoped>

.InputComments
{
  border-top: 1px solid lavender;
  padding-top: 14px;
}

.v-dialog{
  height: 70vh;
  max-height: 70vh;
  margin-top: 700px !important;

}

.mainList
{
  scroll-behavior: smooth;
  height: 30vh;
  overflow-y: auto;
  
}
.Vdialog {
 height: '72vh' !important;
 margin-top:'47vh';
}
.OveralList
{
  background-color: white;  
}
.comment-section {
  background-color: #333;
  color: white;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
}

.comment-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
}

.comment-input-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: black !important;
}
.new
{
  color: white !important;
}
.comment-count {
  color: grey;
  padding-left: 5px;
  font-weight: lighter;
}

.user-avatar {
  background-color: pink;
  color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-right: 8px;
}

.comment-input {
  flex: 1;
  border: none;
  padding: 8px;
  border-radius: 16px;
  background-color: #000;
  color: white;
}

.comment-input::placeholder {
  color: #aaa;
}
</style>
