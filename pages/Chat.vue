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
            <v-menu offset-y v-if="selectedConversation">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-btn v-if="selectedConversation" @click="leaveConversation">close chat</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn v-if="selectedConversation" @click="openAddUserDialog">Add user to chat</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn v-if="selectedConversation" @click="deleteChat">Delete chat</v-btn>
                </v-list-item>
                <!-- <v-list-item>
                  <v-btn @click="chooseUser">
                    <v-list-item-title>Choisir un utilisateur</v-list-item-title>
                  </v-btn>
                </v-list-item> -->
              </v-list>
            </v-menu>
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

    <!-- Add user to conversation dialog -->
    <v-dialog v-model="addUserDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Add users</span>
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
            <v-btn color="blue darken-1" text @click="addUserToChat">Créer</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>


  </v-container>
</template>

<script>
import io from 'socket.io-client';
import moment from 'moment'

export default {
  data() {
    return {
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
    // this.userId = localStorage.getItem("userId");
    this.fetchMembers();
    // this.fetchUserInfo();
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

    addUserToChat(){

      let data = {
        conversationId: this.selectedConversation.id,
        users: this.members
      }
      this.socket.emit("addUserToChat", data)
      this.members = []
      this.addUserDialog = false

    },

    deleteChat(){
      if(confirm('Do you wan tit delete the chat ?')){
        let data = {
          groupId: this.selectedConversation,
          admin: this.userId
        }
        this.socket.emit("deleteChat", data)
      }
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

    async openAddUserDialog(){
      this.addUserDialog = true
    },
    
    async closeAddUserDialog(){
      this.addUserDialog = false
    },

    async openCreateConversation() {
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
    },

    async fetchUserInfo(){
      try {
        const response = await fetch("https://gymtime-backend.onrender.com/v1/user/user-info");
        localStorage.setItem("userInfo", response.data)
      } catch (error) {
        console.log(error);
      }
    },

    async fetchMembers() {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJBbnNlbCIsImxhc3ROYW1lIjoiQXl1ayIsImdlbmRlciI6MCwidXNlclR5cGUiOjUsImlzRW1haWxWZXJpZmllZCI6dHJ1ZSwiZW1haWwiOiJheXVla3BAZ21haWwuY29tIiwic2hvcnRJZCI6IkFVUTRMOUxMNExPOUhBOVciLCJhdmF0YXIiOiJodHRwczovL2Jpei50cmFuemFrLm5ldC9sb2dvLnBuZyIsImJpbyI6IlRoaXMgaXMgbXkgcGVyc29uYWwgYWNjb3VudCBJIGFtIHRoZSBtYW4gb2YgbWVuIiwidXNlcklkIjoiZmNhMDg3YzkwZDZjNGVkNTgyYzFlN2YxYjhmMTZlZjIiLCJpYXQiOjE3MTY5OTU5NzIsImV4cCI6MTcyNDc3MTk3Mn0.AlmkBqBcPqkZ64YxteC-xW_vfJ2jAKBpbHw5BeRy7ds");

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({}),
          redirect: "follow"
        };
        const response = await fetch('https://gymtime-backend.onrender.com/v1/user/services/list', requestOptions);
        const data = await response.json();
        let membersList = data?.data.list;
        console.log(membersList)
        this.members = [...membersList];

      } catch (error) {
        console.error('Erreur lors de la récupération des membres:', error);
      }
      this.groupName = ''

    },

    createConversation() {
      if (this.$refs.form.validate()) {
        this.socket.emit("createConversation", { name : this.groupName, users: this.selectedMembers, admin: this.userId});
        this.selectedMembers = []
        this.groupName = ''
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
