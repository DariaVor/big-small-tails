const petRouter = require('express').Router();
const { Pet, User, PetStatus, Category, Color, RequestStatus } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const upload = require('../middlewares/multer.middleware');
const sharp = require('sharp');
const fs = require('fs/promises');
const { verifyAdmin } = require('../middlewares/verifyAdmin');
const { Op } = require('sequelize');
// const petLimiter = require('../middlewares/petLimiter');

// GET все питомцы
petRouter.route('/').get(async (req, res) => {
  try {
    const pets = await Pet.findAll({
      order: [['createdAt', 'DESC']],
      include: [{ model: PetStatus, attributes: ['status'] }],
    });
    res.json(pets);
  } catch (error) {
    console.error('Ошибка при получении всех питомцев:', error);
    res.status(500).send('Internal server error');
  }
});

// GET все потерянные питомцы
petRouter.get('/lost', async (req, res) => {
  const {
    page = 1,
    limit = 6,
    searchTerm,
    selectedCategories,
    selectedColors,
    hasCollar,
    startDate,
    endDate,
  } = req.query;

  const offset = (page - 1) * limit;
  const where = {
    petStatusId: 1,
    requestStatusId: 2,
  };

  if (searchTerm) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${searchTerm}%` } },
      { description: { [Op.iLike]: `%${searchTerm}%` } },
      { location: { [Op.iLike]: `%${searchTerm}%` } },
      { contactInfo: { [Op.iLike]: `%${searchTerm}%` } },
      { '$Category.category$': { [Op.iLike]: `%${searchTerm}%` } },
      { '$Color.color$': { [Op.iLike]: `%${searchTerm}%` } },
    ];
  }

  if (selectedCategories && selectedCategories.length > 0) {
    const categoriesArray = selectedCategories.split(',').map(Number);
    where.categoryId = { [Op.in]: categoriesArray };
  }

  if (selectedColors && selectedColors.length > 0) {
    const colorsArray = selectedColors.split(',').map(Number);
    where.colorId = { [Op.in]: colorsArray };
  }

  if (hasCollar === 'true') {
    where.hasCollar = true;
  } else if (hasCollar === 'false') {
    where.hasCollar = false;
  }

  if (startDate && endDate) {
    where.date = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  }

  try {
    const { rows: pets, count: total } = await Pet.findAndCountAll({
      where,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      include: [
        { model: PetStatus, attributes: ['status'] },
        { model: Category, attributes: ['category'] },
        { model: Color, attributes: ['color'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      pets,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    console.error('Ошибка при получении потерянных питомцев:', error);
    res.status(500).send('Internal server error');
  }
});

// GET все найденные питомцы
petRouter.get('/found', async (req, res) => {
  const {
    page = 1,
    limit = 6,
    searchTerm,
    selectedCategories,
    selectedColors,
    hasCollar,
    startDate,
    endDate,
  } = req.query;

  const offset = (page - 1) * limit;
  const where = {
    petStatusId: 2,
    requestStatusId: 2,
  };

  if (searchTerm) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${searchTerm}%` } },
      { description: { [Op.iLike]: `%${searchTerm}%` } },
      { location: { [Op.iLike]: `%${searchTerm}%` } },
      { contactInfo: { [Op.iLike]: `%${searchTerm}%` } },
      { '$Category.category$': { [Op.iLike]: `%${searchTerm}%` } },
      { '$Color.color$': { [Op.iLike]: `%${searchTerm}%` } },
    ];
  }

  if (selectedCategories && selectedCategories.length > 0) {
    const categoriesArray = selectedCategories.split(',').map(Number);
    where.categoryId = { [Op.in]: categoriesArray };
  }

  if (selectedColors && selectedColors.length > 0) {
    const colorsArray = selectedColors.split(',').map(Number);
    where.colorId = { [Op.in]: colorsArray };
  }

  if (hasCollar === 'true') {
    where.hasCollar = true;
  } else if (hasCollar === 'false') {
    where.hasCollar = false;
  } // Do nothing for 'Неважно'

  if (startDate && endDate) {
    where.date = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  }

  try {
    const { rows: pets, count: total } = await Pet.findAndCountAll({
      where,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      include: [
        { model: PetStatus, attributes: ['status'] },
        { model: Category, attributes: ['category'] },
        { model: Color, attributes: ['color'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      pets,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    console.error('Ошибка при получении найденных питомцев:', error);
    res.status(500).send('Internal server error');
  }
});


// GET категории
petRouter.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при загрузке категорий', error });
  }
});

// GET цвета
petRouter.get('/colors', async (req, res) => {
  try {
    const colors = await Color.findAll();
    res.json(colors);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при загрузке цветов', error });
  }
});

// GET одного питомца
petRouter.route('/:id').get(async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id, {
      include: [
        { model: PetStatus, attributes: ['status'] },
        { model: User, attributes: ['username', 'email'] },
        { model: Category, attributes: ['category'] },
        { model: Color, attributes: ['color'] },
      ],
    });

    if (!pet) {
      return res.status(404).send('Pet not found');
    }

    res.json(pet);
  } catch (error) {
    console.error('Ошибка при получении одного питомца:', error);
    res.status(500).send('Internal server error');
  }
});

// POST новый питомец
petRouter
  .route('/add')
  .post(upload.single('file'), verifyAccessToken, async (req, res) => {
    try {
      let imageName = null;

      if (req.file) {
        imageName = `${Date.now()}.webp`;
        const outputBuffer = await sharp(req.file.buffer).rotate().webp().toBuffer();
        await fs.writeFile(`./public/img/${imageName}`, outputBuffer);
      } else {
        imageName = 'paw.svg';
      }

      const defaultColor = await Color.findOne({ where: { color: 'Отсутствует' } });
      const defaultColorId = defaultColor ? defaultColor.id : null;

      const petData = {
        name: req.body.name || 'Имя отсутствует',
        petStatusId: req.body.petStatusId ? parseInt(req.body.petStatusId) : null,
        categoryId: req.body.categoryId ? parseInt(req.body.categoryId) : null,
        colorId: req.body.colorId ? parseInt(req.body.colorId) : defaultColorId,
        description: req.body.description || 'Отсутствует',
        location: req.body.location || 'Отсутствует',
        image: imageName,
        hasCollar: req.body.hasCollar ? req.body.hasCollar === 'true' : null,
        contactInfo: req.body.contactInfo || 'Отсутствует',
        date: req.body.date ? new Date(req.body.date) : 'Отсутствует',
        requestStatusId: 1,
        userId: res.locals.user.id,
      };

      console.log('Pet Data:', petData);

      const pet = await Pet.create(petData);

      res.status(201).json(pet);
    } catch (error) {
      console.error('Ошибка при добавлении питомца:', error);
      res.status(500).json({ message: 'Произошла ошибка при добавлении записи', error });
    }
  });

// UPDATE одного питомца
petRouter.route('/:id').patch(upload.single('file'), verifyAccessToken, async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      return res.status(404).send('Питомец не найден');
    }

    if (req.file) {
      const imageName = `${Date.now()}.webp`;
      const outputBuffer = await sharp(req.file.buffer).rotate().webp().toBuffer();
      await fs.writeFile(`./public/img/${imageName}`, outputBuffer);
      req.body.image = imageName;

      if (pet.image && pet.image !== 'paw.svg') {
        try {
          await fs.unlink(`./public/img/${pet.image}`);
        } catch (err) {
          if (err.code !== 'ENOENT') {
            throw err;
          }
        }
      }
    }

    await Pet.update(req.body, { where: { id: req.params.id } });

    pet.requestStatusId = 1;
    await pet.save();

    const updatedPet = await Pet.findByPk(req.params.id);
    res.json(updatedPet);
  } catch (error) {
    console.error('Ошибка при обновлении питомца:', error);
    res.status(500).send('Internal server error');
  }
});

// DELETE одного питомца
petRouter.route('/:id').delete(verifyAccessToken, async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      return res.status(404).send('Питомец не найден');
    }

    if (pet.image && pet.image !== 'paw.svg') {
      try {
        await fs.unlink(`./public/img/${pet.image}`);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          throw err;
        }
      }
    }

    await pet.destroy();
    res.send('Успешно удалено');
  } catch (error) {
    console.error('Ошибка при удалении питомца:', error);
    res.status(500).send('Internal server error');
  }
});

// GET all pending approval pets (admin)
petRouter.get('/admin/approvals', verifyAccessToken, verifyAdmin, async (req, res) => {
  try {
    const pendingPets = await Pet.findAll({
      where: { requestStatusId: 1 },
      include: [{ model: RequestStatus, attributes: ['status'] }],
    });
    res.json(pendingPets);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// PATCH approve pet (admin)
petRouter.patch('/admin/approve/:id', verifyAccessToken, verifyAdmin, async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).send('Pet not found');

    pet.requestStatusId = 2;
    await pet.save();
    res.json(pet);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// PATCH reject pet (admin)
petRouter.patch('/admin/reject/:id', verifyAccessToken, verifyAdmin, async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).send('Pet not found');

    pet.requestStatusId = 4;
    await pet.save();
    res.json(pet);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

module.exports = petRouter;
