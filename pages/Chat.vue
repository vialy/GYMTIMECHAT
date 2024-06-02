<template>
  <v-container fluid>
    <v-row>
      <!-- Liste des conversations -->
      <v-col cols="12" md="4" v-if="!selectedConversation">
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
              </v-list>
            </v-menu>
          </div>
          <v-list-item v-for="conversation in conversations" :key="conversation.id" @click="selectConversation(conversation)">
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
                <v-list-item-action-text>
                  {{ 
                    conversation.messages[conversation.messages.length-1]?.content &&
                    conversation.messages[conversation.messages.length-1]?.createdAt 
                  }}
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- Vue de la conversation -->
      <v-col cols="12" v-if="selectedConversation">
        <v-card>
          <v-card-title>
            <v-btn icon @click="leaveConversation">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <span v-if="selectedConversation">{{ selectedConversation.name }}</span></br>
            <span class="userGroupName" v-if="selectedConversation">  {{ getFormattedUserNames(selectedConversation) }}</span>
            <v-spacer></v-spacer>
            <v-menu offset-y v-if="selectedConversation">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-btn v-if="selectedConversation" @click="leaveConversation">Fermer le chat</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn v-if="selectedConversation" @click="openAddUserDialog">Ajouter un utilisateur</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn v-if="selectedConversation" @click="deleteChat">Supprimer le chat</v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text>
            <div v-if="selectedConversation" class="messages"> 
              <div v-for="message in selectedConversation.messages" :key="message.time" :class="{'message-right': message.userId === userId, 'message-left': message.userId !== userId}">
                <div :class="{'blue lighten-4': message.userId === userId, 'green lighten-4': message.userId !== userId}" class="message-bubble">
                  <v-avatar v-if="getUserById(message.userId)?.avatar || 'https://cdn.vuetifyjs.com/images/john.jpg'" class="mr-2">
                    <!-- <img :src="getUserById(message.userId)?.avatar" alt="Avatar" /> -->
                    <img :src="getUserById(message.userId)?.avatar || 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="Avatar" />
                  </v-avatar>
                  <small style="font-weight: bold;">{{ getUserById(message.userId)?.firstName }} {{ getUserById(message.userId)?.lastName }}</small>
                  <p style="margin-bottom: 0px;">{{ message.content }}</p>
                  <small>{{ relativeDateFormatter(message.createdAt) }}</small>
                </div>
              </div>
            </div>

            
          </v-card-text>
          <v-card-actions v-if="selectedConversation">
            <input type="text" v-model="newMessage" auto-grow outlined placeholder="Type a message..." class="message-input"/>
            <span v-if="newMessage.length > 0">
              <v-btn @click="sendMessage" color="primary">Envoyer</v-btn>
            </span>
          </v-card-actions>
        </v-card>
      </v-col>

    </v-row>

    <!-- Modal pour créer une nouvelle conversation -->
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
              item-text="firstName"
              item-value="_id"
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

    <!-- Modal pour ajouter des utilisateurs à la conversation -->
    <v-dialog v-model="addUserDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Ajouter des utilisateurs</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-select
              v-model="selectedMembers"
              :items="members"
              item-text="firstName"
              item-value="_id"
              label="Membres"
              :rules="[rules.required]"
              multiple
              chips
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeAddUserDialog">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="addUserToChat">Ajouter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import io from 'socket.io-client';
import { relativeDateFormatter } from '../utils';

export default {
  data() {
    return {
      relativeDateFormatter,
      userId: "",
      socket: null,
      conversations: [],
      selectedConversation: null,
      newMessage: '',
      addUserDialog: false,
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
    this.userId = "fca087c90d6c4ed582c1e7f1b8f16ef2";
    this.fetchMembers();
    this.socket = io('http://localhost:5000');
    this.socket.emit("getConversations");
    this.socket.on("allConversations", conversations => {
      this.conversations = conversations;
      // Update selected conversation if needed
      if (this.selectedConversation) {
        this.selectedConversation = this.conversations.find(conv => conv.id === this.selectedConversation.id) || null;
      }
    });

    this.socket.on('message', (message) => {
      const conversation = this.conversations.find(conv => conv.id === message.groupId);
      if (conversation) {
        conversation.messages.push(message);
        // If the conversation is selected, update it
        if (this.selectedConversation && this.selectedConversation.id === conversation.id) {
          this.selectedConversation.messages = [...conversation.messages];
        }
      }
    });

    // Listen for conversationDeleted event
    this.socket.on('conversationDeleted', (deletedConversationId) => {
      this.conversations = this.conversations.filter(conv => conv.id !== deletedConversationId);
      this.selectedConversation = null; // Return to the conversation list view
    });

    // Listen for newConversation event
    this.socket.on('newConversation', (newConversationId) => {
      this.selectedConversation = this.conversations.find(conv => conv.id === newConversationId);
    });
  },
  methods: {
      getUserById(userId) {
      const u = this.members.find(member => member._id === userId);
      console.log(u);
        return u;
    },
    getUserNamesInConversation(conversation) {
    return conversation.userGroup.map(userGroup => {
      const user = this.getUserById(userGroup.user.user_id);
      return user ? `${user.firstName}` : 'Unknown User';
    });
  },
  getFormattedUserNames(conversation) {
    const userNames = this.getUserNamesInConversation(conversation);
    if (userNames.length > 6) {
      return userNames.slice(0, 6).join(', ') + '...';
    }
    return userNames.join(', ');
  },
    selectConversation(conversation) {
      this.selectedConversation = this.conversations.find(conv => conv.id === conversation.id);
      this.socket.emit('joinConversation', conversation.id);
    },
    leaveConversation() {
      this.selectedConversation = null;
    },
    addUserToChat() {
      let data = {
        conversationId: this.selectedConversation.id,
        users: this.selectedMembers // Utilisez selectedMembers au lieu de members
      };
      this.socket.emit("addUserToChat", data);
      this.selectedMembers = [];
      this.addUserDialog = false;
    },
    
    deleteChat() {
      if (confirm('Voulez-vous supprimer le chat ?')) {
        let data = {
          groupId: { id: this.selectedConversation.id }, // Assurez-vous que `id` est bien défini
          admin: this.userId
        };
        console.log(data.groupId);
        this.socket.emit("deleteChat", data);
      }
    },
    sendMessage() {
        if (this.newMessage.trim() === '') return;
      const message = {
        conversationId: this.selectedConversation.id,
        sender: this.userId,
        content: this.newMessage,
        date: new Date().toLocaleTimeString()
      };
      this.socket.emit('sendMessage', message);
      this.newMessage = '';
    },

    
    async openAddUserDialog() {
      this.addUserDialog = true;
    },
    async closeAddUserDialog() {
      this.addUserDialog = false;
    },
    async openCreateConversation() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    async fetchMembers() {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "your-token-here");

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({}),
          redirect: "follow"
        };
        this.$request.post(this.$request.baseUrl + '/v1/user/services/list').then(res => {
          if (res.success) {
            let membersList = res.data.list;
            this.members = [...membersList];
            console.log(this.members);
          }
        }).catch(err => {
          console.log(err);
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des membres:', error);
      }
      this.groupName = '';
    },
    createConversation() {
      if (this.$refs.form.validate()) {
        this.socket.emit("createConversation", { name: this.groupName, users: this.selectedMembers, admin: this.userId });
        this.selectedMembers = [];
        this.groupName = '';
        this.closeDialog();
      }
    },
  }
};
</script>


<style scoped>
.message-input {
  width: 100%;
  border: 1px solid #adadad;
  background-color: #f4f4f4;
  padding: 5px 20px;  
  border-radius: 15px;
  outline: none;
}
.messages {
  max-height: 50vh !important;
  height: 50vh !important;
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
.userGroupName
{
  font-size: 15px;
}
</style>
