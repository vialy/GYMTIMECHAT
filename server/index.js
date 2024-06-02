const express = require('express');
const http = require('http');
const { ObjectId } = require('mongodb');
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
        include: {
          messages: true,
          userGroup: {
            include: {
              user: true
            }
          }
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

      const usersNotInTable = [];

      // Check  whether users exist
      for (const userId of data.users) {
        const user = await prisma.user.findFirst({
          where: { user_id: userId },
        });
        if (!user) {
          usersNotInTable.push(userId);
        }
      }
      
      // Create user not yet existing
      if (usersNotInTable.length > 0) {
        const createdUsers = await prisma.user.createMany({
          data: usersNotInTable.map((userId) => ({
            user_id: userId,
          })),
        });
      
        console.log("Created users:", createdUsers);
      } else {
        console.log("All users already exist in the table.");
      }

      // Créez le groupe
      const newGroup = await prisma.group.create({
        data: {
          name: data.name,
          ownerId: data.admin,
        },
      });

      // create user group
      const userGroup = await prisma.user_Group.createMany({
        data: data.users.map(user=>({
          id_user: user,
          id_group: newGroup.id
        }))
      });

      // Get all the groups and return them
      const conversations = await prisma.group.findMany(
        {
          include: {
            messages: true,
            userGroup: {
              include: {
                user: true
              }
            }
          }
        }
      );
      socket.emit("allConversations", conversations);

      // Emit the new conversation
      socket.emit("newConversation", newGroup.id);

    } catch (error) {
      console.error('Erreur lors de la création du groupe:', error);
      throw error;
    }
  });

  // Add user to conversation
  socket.on("addUserToChat", async (data) => {
    try {
      const usersNotInTable = [];
      const usersNotInConversation = [];
  
      // Check whether users exist
      for (const userId of data.users) {
        const user = await prisma.user.findFirst({
          where: { user_id: userId.toString() },
        });
        if (!user) {
          usersNotInTable.push(userId);
        }
      }
  
      // Create users not yet existing
      if (usersNotInTable.length > 0) {
        const createdUsers = await prisma.user.createMany({
          data: usersNotInTable.map((userId) => ({
            user_id: userId,
          })),
        });
  
        console.log("Created users:", createdUsers);
      } else {
        console.log("All users already exist in the table.");
      }
  
      // Check if the user is already in the group
      for (const userId of data.users) {
        const userGroup = await prisma.user_Group.findFirst({
          where: {
            id_user: userId,
            id_group: data.conversationId
          },
        });
        if (!userGroup) {
          usersNotInConversation.push(userId);
        }
      }
  
      // Create users not yet in the conversation
      if (usersNotInConversation.length > 0) {
        const createdUserGroups = await prisma.user_Group.createMany({
          data: usersNotInConversation.map((userId) => ({
            id_user: userId,
            id_group: data.conversationId
          })),
        });
        console.log("Added users to the conversation:", createdUserGroups);
      } else {
        console.log("All users already exist in the conversation.");
      }
  
      // Get all the groups and return them
      const conversations = await prisma.group.findMany({
        include: {
          messages: true,
          userGroup: {
            include: {
              user: true
            }
          }
        }
      });
  
      console.log(conversations);
      socket.emit("allConversations", conversations);
  
    } catch (error) {
      console.log(error);
    }
  });
  

  socket.on("deleteChat",  async (data)=>{
    console.log(data);

    try {
      
      // Suppression des relations utilisateur-conversation
      const user_converation = await prisma.user_Group.deleteMany({
        where:{
          id_group: data.groupId.id
        }
      });

       // Suppression de la conversation
      const conversation = await prisma.group.delete({
        where:{
          ownerId: data.admin,
          id: data.groupId.id
        }
      });
  
      // Récupérez toutes les conversations avec leurs messages
      const conversations = await prisma.group.findMany({
        include: {
          messages: true,
          userGroup: {
            include: {
              user: true
            }
          }
        }
      });
  
      // Émettez les conversations mises à jour
      io.emit('allConversations', conversations);
      
       // Inform the client that the conversation has been deleted
      socket.emit('conversationDeleted', data.groupId.id);


    } catch (error) {
      throw new Error(error);
    }
  })

  socket.on('sendMessage', async (message) => {
    const { conversationId, sender, content } = message;
    console.log(message)
  
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
        where: { user_id: sender },
      });
  
      if (!user) {

        // Si l'utilisateur n'existe pas, vous pouvez le créer ici
        await prisma.user.create({
          data: {
            user_id: sender,
          },
        });
      }
  
      // Créez le message et associez-le au groupe
      const newMessage = await prisma.message.create({
        data: {
          content,
          userId: sender,
          groupId: conversationId,
        },
      });

      // Émettre le message à tous les clients connectés à cette conversation
      io.to(conversationId).emit('message', newMessage);
  
      // Récupérez toutes les conversations avec leurs messages
      const conversations = await prisma.group.findMany({
        include: {
          messages: true,
          userGroup: {
            include: {
              user: true
            }
          }
        }
      });
  
      // Émettez les conversations mises à jour
      io.emit('allConversations', conversations);

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


