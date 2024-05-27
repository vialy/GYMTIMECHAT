const prisma = require('../prismaClient');

const getAllMessages = async (req, res) => {
  const messages = await prisma.message.findMany({
    where: {
      groupId: req.params.groupId
    },
    include: {
      user: true
    }
  });
  res.json(messages);
};

const sendMessage = async (req, res) => {
  const { content, groupId } = req.body;
  const message = await prisma.message.create({
    data: {
      content,
      userId: req.user.id,
      groupId
    }
  });
  res.json(message);
};

const createGroup = async (req, res) => {
  const { name } = req.body;
  const group = await prisma.group.create({
    data: {
      name,
      ownerId: req.user.id,
      members: {
        connect: { id: req.user.id }
      }
    }
  });
  res.json(group);
};

const addUserToGroup = async (req, res) => {
  const { userId, groupId } = req.body;
  const group = await prisma.group.update({
    where: { id: groupId },
    data: {
      members: {
        connect: { id: userId }
      }
    }
  });
  res.json(group);
};

module.exports = {
  getAllMessages,
  sendMessage,
  createGroup,
  addUserToGroup
};
