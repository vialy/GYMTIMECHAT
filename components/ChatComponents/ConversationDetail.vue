<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>Conversation {{ conversationId }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="$emit('quitConversation')">Quit</v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-list>
        <v-list-item
          v-for="message in messages"
          :key="message.id"
          :class="{'message-received': message.sender !== 'You', 'message-sent': message.sender === 'You'}"
        >
          <v-list-item-content>
            <v-list-item-title>{{ message.sender }} - {{ message.time }}</v-list-item-title>
            <v-list-item-subtitle>{{ message.body }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-text-field
        v-model="newMessage"
        label="Type a message..."
        outlined
        full-width
        clearable
        @keyup.enter="sendMessage"
      ></v-text-field>
      <v-btn @click="sendMessage" color="primary">Send</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['messages', 'conversationId'],
  data() {
    return {
      newMessage: ''
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() === '') return;
      this.$emit('sendMessage', { sender: 'You', body: this.newMessage });
      this.newMessage = '';
    }
  }
};
</script>

<style scoped>
.message-sent {
  justify-content: flex-end;
  background-color: blue;
  color: white;
}
.message-received {
  justify-content: flex-start;
  background-color: green;
  color: white;
}
</style>
