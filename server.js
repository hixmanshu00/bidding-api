const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require('./models');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const bidRoutes = require('./routes/bidRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const bidService = require('./services/bidService');
require('dotenv').config();
require('./config/passport');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
global.io = io;

app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/users', authRoutes);
app.use('/items', itemRoutes);
app.use('/item', bidRoutes);
app.use('/notifications', notificationRoutes);


io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('bid', async (data) => {
    try {
      const { token, itemId, amount } = data;

      // Decode the token to get the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      const bid = await bidService.placeBid(itemId, userId, amount);
      io.emit('new_bid', bid);
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

