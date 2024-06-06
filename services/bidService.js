const { Bid, Item, User, Notification } = require('../models');
const notificationService = require('./notificationService');

exports.placeBid = async (itemId, userId, bidAmount) => {
  // Get the item to check the current price and end time
  const item = await Item.findByPk(itemId);
  if (!item) {
    throw new Error('Item not found');
  }

  // Check if the bid amount is greater than the current price
  if (bidAmount <= item.current_price) {
    throw new Error('Bid amount must be higher than the current price');
  }

  // Check if the auction has ended
  if (new Date() > new Date(item.end_time)) {
    throw new Error('Auction has ended');
  }

  // Create the bid
  const bid = await Bid.create({
    item_id: itemId,
    user_id: userId,
    bid_amount: bidAmount,
  });

  // Update the item's current price
  await item.update({ current_price: bidAmount });

  // Notify the item owner about the new bid
  await notificationService.createNotification(item.user_id, `Your item "${item.name}" has received a new bid of ${bidAmount}.`);

  // Notify the previous highest bidder about being outbid
  const previousHighestBid = await Bid.findOne({
    where: { item_id: itemId },
    order: [['bid_amount', 'DESC']],
  });

  if (previousHighestBid && previousHighestBid.user_id !== userId) {
    await notificationService.createNotification(previousHighestBid.user_id, `You have been outbid on the item "${item.name}". New bid amount is ${bidAmount}.`);
  }

  // Emit the new bid event to all connected clients
  global.io.emit('new_bid', bid);
  return bid;
};


// Get all bids for a specific item
exports.getBidsByItemId = async (itemId) => {
  const bids = await Bid.findAll({
    where: { item_id: itemId },
    include: [
      { model: User, attributes: ['id', 'username'] },  // Include user information
    ],
    order: [['created_at', 'DESC']], // Order by the most recent bids
  });

  return bids;
};