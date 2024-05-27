const jwt = require('jsonwebtoken');
const axios = require('axios');
const prisma = require('../prismaClient');

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    // Verify user with external API
    const userResponse = await axios.get(`http://gymtime.user.api.com/user/${req.user.id}`);
    
    if (userResponse.data && userResponse.data.id === req.user.id) {
      next();
    } else {
      return res.sendStatus(403); // Forbidden
    }
  } catch (err) {
    return res.sendStatus(403); // Forbidden
  }
};

module.exports = authenticateToken;
