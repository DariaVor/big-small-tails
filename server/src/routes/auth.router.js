const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookie.config');

const { emailSchema, passwordSchema } = require('../middlewares/validationSchemas');

authRouter.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    emailSchema.parse(email);
    passwordSchema.parse(password);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { username, password: await bcrypt.hash(password, 10) },
    });

    if (!created) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    const plainUser = user.get();
    delete plainUser.password;

    const { accessToken, refreshToken } = generateTokens({ user: plainUser });

    res
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({ user: plainUser, accessToken });
  } catch (error) {
    if (error.errors) {
      const errorMessage = error.errors.map((err) => err.message).join(', ');
      return res.status(400).json({ message: errorMessage });
    }
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    const plainUser = user.get();
    delete plainUser.password;

    const { accessToken, refreshToken } = generateTokens({ user: plainUser });
    res
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({ user: plainUser, accessToken });
  } catch (error) {
    if (error.errors) {
      // Zod validation error handling
      const errorMessage = error.errors.map((err) => err.message).join(', ');
      return res.status(400).json({ message: errorMessage });
    }
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

authRouter.get('/logout', (req, res) => {
  res.clearCookie('refreshToken').sendStatus(200);
});

module.exports = authRouter;
