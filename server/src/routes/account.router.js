const express = require('express');
const { Pet, User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const accountRouter = express.Router();

// GET все животные определенного пользователя
accountRouter.route('/').get(verifyAccessToken, async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const pets = await Pet.findAll({
      where: { userId },
      include: {
        model: User,
        attributes: ['id', 'username', 'email'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.json(pets);

  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error');
  }
});

module.exports = accountRouter;
