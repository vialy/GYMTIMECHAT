<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-list dense>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <p style="font-weight: bold; padding-left: 20px;">Conversations</p>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-btn @click="openCreateConversation">
                    <v-list-item-title>Créer une conversation</v-list-item-title>
                  </v-btn>
                </v-list-item>
                <!-- <v-list-item>
                  <v-btn @click="chooseUser">
                    <v-list-item-title>Choisir un utilisateur</v-list-item-title>
                  </v-btn>
                </v-list-item> -->
              </v-list>
            </v-menu>
          </div>
          <v-list-item v-for="conversation in conversations" :key="conversation.id" @click="selectConversation(conversation)">
            <!-- <v-list-item-avatar>
              <v-img :src="conversation.picture"></v-img>
            </v-list-item-avatar> -->
            <v-list-item-content>
              <v-list-item-title>{{ conversation.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ 
                  conversation.messages[conversation.messages.length-1]?.content ?
                  conversation.messages[conversation.messages.length-1]?.content.length > 30 ? conversation.messages[conversation.messages.length-1].content.slice(0, 30) + '...' : conversation.messages[conversation.messages.length-1].content 
                  :
                  "No message yet"
                }}
              </v-list-item-subtitle>
              <v-list-item-action>
                <v-list-item-action-text>{{ 
                  conversation.messages[conversation.messages.length-1]?.content &&
                  conversation.messages[conversation.messages.length-1]?.createdAt 
                }}</v-list-item-action-text>
              </v-list-item-action>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="8">
        <v-card>
          <v-card-title>
            <!-- <span>Conversation name</span> -->
            <span v-if="selectedConversation">{{ selectedConversation.name }}</span>
            <v-spacer></v-spacer>
            <v-btn v-if="selectedConversation" @click="leaveConversation">Leave</v-btn>
          </v-card-title>
          <v-card-text>
            <div v-if="selectedConversation" class="messages"> 
              <div v-for="message in selectedConversation.messages" :key="message.time" :class="{'message-right': message.userId === userId, 'message-left': message.userId !== userId}">
                <div :class="{'blue lighten-4': message.userId === userId, 'green lighten-4': message.userId !== userId}" class="message-bubble">
                  <small style="font-weight: bold;">{{ message.sender }}</small>
                  <p style="margin-bottom: 0px;">{{ message.content }}</p>
                  <small>{{ message.createdAt }}</small>
                </div>
              </div>
            </div>
          </v-card-text>
          <v-card-actions v-if="selectedConversation">
            <input type="text" v-model="newMessage" auto-grow outlined placeholder="Type a message..." class="message-input"/>
            <span v-if="newMessage.length > 0">
              <v-btn @click="sendMessage" color="primary">Send</v-btn>
            </span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal for creating a new conversation -->
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Créer une nouvelle conversation</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="groupName"
                label="Nom du groupe"
                :rules="[rules.required]"
                required
              ></v-text-field>

              <v-select
                v-model="selectedMembers"
                :items="members"
                item-text="name"
                item-value="id"
                label="Membres"
                :rules="[rules.required]"
                multiple
                chips
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Annuler</v-btn>
            <v-btn color="blue darken-1" text @click="createConversation">Créer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      userId: "",
      socket: null,
      conversations: [],
      selectedConversation: null,
      newMessage: '',
      dialog: false,
      valid: false,
      groupName: '',
      members: [],
      selectedMembers: [],
      rules: {
        required: value => !!value || 'Requis.',
      },
    };
  },
  mounted() {
    localStorage.setItem("userId", Math.floor(Math.random()*1000)+1+"_userid");
    this.userId = localStorage.getItem("userId");
    this.socket = io('http://localhost:5000');
    this.socket.emit("getConversations");

    this.socket.on("allConversations", conversations=>{
      this.conversations = conversations;
      console.log(this.selectedConversation);
    });

    this.socket.on('message', (message) => {
      const conversation = this.conversations.find(conv => conv.id === message.groupId);
      if (conversation) {
        this.selectedConversation.messages.push(message);
      }
    });

  },
  methods: {

    selectConversation(conversation) {
      this.selectedConversation = conversation;
      this.socket.emit('joinConversation', conversation.id);
    },

    leaveConversation() {
      this.selectedConversation = null;
    },

    sendMessage() {
      const message = {
        conversationId: this.selectedConversation.id,
        sender: this.userId,
        content: this.newMessage,
        date: new Date().toLocaleTimeString()
      }

      this.socket.emit('sendMessage', message);
      this.newMessage = '';
    },

    async openCreateConversation() {
      this.dialog = true;
      await this.fetchMembers();
    },

    closeDialog() {
      this.dialog = false;
    },

    async fetchUserInfo(){
      try {
        const response = await fetch("https://gymtime-backend.onrender.com/v1/user/user-info");
        
      } catch (error) {
        
      }
    },

    async fetchMembers() {
      try {

        const response = await fetch('/members');
        const data = await response.json();

        this.members = [
          {
            id: "2388",
            name: 'Lyz',
          },
          {
            id: "44555",
            name: 'Anton',
          },
          {
            id: "655",
            name: 'John',
          },
        ];

      } catch (error) {
        console.error('Erreur lors de la récupération des membres:', error);
      }
      this.groupName = ''

    },

    createConversation() {
      if (this.$refs.form.validate()) {
        this.socket.emit("createConversation", { name : this.groupName, users: this.selectedMembers});
        this.closeDialog();
      }
    },

    chooseUser() {
      console.log('Choisir un utilisateur');
    },
  }
};
</script>

<style scoped>
.message-input{
  width: 100%;
  border: 1px solid #adadad;
  background-color: #f4f4f4;
  padding: 5px 20px;  
  border-radius: 15px;
  outline: none;
}
.messages {
  max-height: 50vh !important;
  height:  50vh !important;
  overflow-y: auto;
}
.message-left {
  text-align: left;
}
.message-right {
  text-align: right;
}
.message-bubble {
  display: inline-block;
  background-color: #f4f4f4;
  color: #0f0f0f;
  max-width: 45%;
  margin: 5px;
  padding: 10px;
  border-radius: 15px;
}
</style>
