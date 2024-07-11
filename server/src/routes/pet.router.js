const xRouter = require('express').Router();
const { , User } = require('../../db/models');

xRouter.route('/').get(async (req, res) => {
  try {
    const xs = await X.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(xs);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

module.exports = xRouter;