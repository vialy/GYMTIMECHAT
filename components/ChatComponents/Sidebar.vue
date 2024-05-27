<template>
    <div>
      <v-list dense class="section-wrapper">
        <v-list-item v-for="conversation in conversations" :key="conversation.id" @click="selectConversation(conversation)">
          <v-list-item-title>{{ conversation.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </template>
  
  <script>
  export default {
    props: ['conversations'],
    methods: {
      selectConversation(conversation) {
        this.$emit('selectConversation', conversation);
      }
    }
  };
  </script>
  <style>
  .section-wrapper{
    height: 80vh;
    max-height: 80vh;
  }
</style>