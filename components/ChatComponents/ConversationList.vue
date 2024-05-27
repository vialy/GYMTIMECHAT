<template>
  <div>
    <div key="conversation.id" :v-for="conversation in conversations">
      <p style="color: #fff;">
        {{ conversation }}
      </p>
      <!-- <div class="">
        <img :src="conversation.avatar" :alt="avatar">
        <small>{{ conversation.messages[conversation.messages.length-1].sender }}</small>
      </div>
      <div>
        <p>{{ conversation.messages[conversation.messages.length-1].text }}</p>
        <small>{{ conversation.messages[conversation.messages.length-1].time }}</small>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ConversationList",
  props: {
    conversations: Array
  }
};
</script>

<style>
</style>