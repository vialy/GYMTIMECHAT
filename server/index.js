const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { PrismaClient } = require("@prisma/client");
const { clearScreenDown } = require('readline');
let  prisma = new PrismaClient();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(bodyParser.json());

let conversations = [
  {
    id: 555,
    name:"Lyz",
    picture:"",
    messages:[
      {
        senderId: 122,
        sender: "Lyz",
        content: "Hello toi",
        date: new Date().toLocaleTimeString()
      },
      {
        senderId: 122,
        sender: "You",
        content: "Hiii",
        date: new Date().toLocaleTimeString()
      },
      {
        senderId: 122,
        sender: "Lyz",
        content: "Howdy?",
        date: new Date().toLocaleTimeString()
      },
    ]
  }
];

io.on('connection', (socket) => {

  socket.on("getConversations",async ()=>{
    const conversations = await prisma.group.findMany(
      {
        include:{
          messages: true
        }
      }
    );
    socket.emit("allConversations", conversations);
  }


);

  socket.on('joinConversation', (conversationId) => {
    socket.join(conversationId);
  });


  // Create a conversation
  socket.on("createConversation", async (data)=>{
    try {
      const existingUsers = await prisma.user.findMany({
        where: {
          id: { in: data.users },
        },
      });
  
      const existingUserIds = new Set(existingUsers.map(user => user.id));
  
      const newUsers = data.users.filter(userId => !existingUserIds.has(userId)).map(userId => ({
        id: userId,
      }));
  
      if (newUsers.length > 0) {
        await prisma.user.createMany({
          data: newUsers,
        });
      }
  
      // Créez le groupe
      const newGroup = await prisma.group.create({
        data: {
          name: data.name,
          ownerId: data.users[0], 
          members: {
            connect: data.users.map(userId => ({ id: userId })),
          },
        },
        include: {
          members: true,
        },
      });
  
      console.log('Groupe créé avec succès:', newGroup);
      return newGroup;
    } catch (error) {
      console.error('Erreur lors de la création du groupe:', error);
      throw error;
    }
  });

  socket.on('sendMessage', async (message) => {
    const { conversationId, sender, content } = message;
  
    try {
      // Vérifiez si le groupe existe
      const group = await prisma.group.findUnique({
        where: { id: conversationId },
      });
  
      if (!group) {
        throw new Error('Le groupe n\'existe pas');
      }
  
      // Vérifiez si l'utilisateur existe
      const user = await prisma.user.findUnique({
        where: { id: sender },
      });
  
      if (!user) {
        // Si l'utilisateur n'existe pas, vous pouvez le créer ici
        await prisma.user.create({
          data: {
            id: sender,
          },
        });
      }
  
      // Créez le message et associez-le au groupe
      const message = await prisma.message.create({
        data: {
          content,
          userId: sender,
          groupId: conversationId,
        },
      });
  
      // Récupérez toutes les conversations avec leurs messages
      const conversations = await prisma.group.findMany({
        include: {
          messages: true,
        },
      });
  
      // Émettez les conversations mises à jour
      socket.emit('allConversations', conversations);
      console.log(message)
      socket.emit('message', message);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error.message);
      socket.emit('error', error.message);
    }
  });
  
  socket.on('disconnect', () => {
    io.emit("message", "A user has left the chat");
  });

});

app.get('/conversations', (req, res) => {
  res.json(conversations);
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
