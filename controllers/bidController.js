const bidService = require('../services/bidService');

exports.getBidsByItemId = async (req, res) => {
  const bids = await bidService.getBidsByItemId(req.params.itemId);
  res.json(bids);
};

exports.placeBid = async (req, res) => {
  try {
    // console.log(req.user.dataValues.id)
    const bid = await bidService.placeBid(req.params.itemId, req.user.dataValues.id, req.body.bid_amount);
    res.status(201).json(bid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
