const rateLimit = require('express-rate-limit');

const createPetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 час
  max: 10, // ограничить каждый IP до 5 запросов на "add" роут за час
  message: 'Слишком много созданных карточек с этого IP, пожалуйста попробуйте снова через час',
});

module.exports = createPetLimiter;
