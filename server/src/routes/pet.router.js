const petRouter = require('express').Router();
const { Pet, User, PetStatus, Category, Color, RequestStatus } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const upload = require('../middlewares/multer.middleware');
const sharp = require('sharp');
const fs = require('fs/promises');
const { verifyAdmin } = require('../middlewares/verifyAdmin');

const defaultImagePath = 'public/img/paw.webp'; // Путь к дефолтному изображению в папке public/img

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
  try {
    const pets = await Pet.findAll({
      where: { petStatusId: 1 },
      order: [['createdAt', 'DESC']],
      include: [{ model: PetStatus, attributes: ['status'] }],
    });
    res.json(pets);
  } catch (error) {
    console.error('Ошибка при получении потерянных питомцев:', error);
    res.status(500).send('Internal server error');
  }
});

// GET все найденные питомцы
petRouter.route('/found').get(async (req, res) => {
  try {
    const pets = await Pet.findAll({
      where: { petStatusId: 2 },
      order: [['createdAt', 'DESC']],
      include: [{ model: PetStatus, attributes: ['status'] }],
    });
    res.json(pets);
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
petRouter.route('/add').post(upload.single('file'), verifyAccessToken, async (req, res) => {
  try {
    let imageName = null;

    if (req.file) {
      imageName = `${Date.now()}.webp`;
      const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();
      await fs.writeFile(`./public/img/${imageName}`, outputBuffer);
    } else {
      imageName = 'paw.webp';
    }

    const petData = {
      name: req.body.name || null,
      petStatusId: req.body.petStatusId ? parseInt(req.body.petStatusId) : null,
      categoryId: req.body.categoryId ? parseInt(req.body.categoryId) : null,
      colorId: req.body.colorId ? parseInt(req.body.colorId) : null,
      description: req.body.description || null,
      location: req.body.location || null,
      image: imageName,
      hasCollar: req.body.hasCollar ? req.body.hasCollar === 'true' : null,
      contactInfo: req.body.contactInfo || null,
      date: req.body.date ? new Date(req.body.date) : null,
      requestStatusId: req.body.requestStatusId ? parseInt(req.body.requestStatusId) : 1,
      userId: 1, // res.locals.user.id,
    };

    console.log('Pet Data:', petData);

    const pet = await Pet.create(petData);

    res.status(201).json(pet);
  } catch (error) {
    console.error('Ошибка при добавлении питомца:', error); // Логирование ошибки
    res.status(500).json({ message: 'Произошла ошибка при добавлении записи', error });
  }
});

// UPDATE одного питомца
petRouter.route('/:id').patch(upload.single('file'), async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      return res.status(404).send('Питомец не найден');
    }

    if (req.file) {
      const imageName = `${Date.now()}.webp`;
      const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();
      await fs.writeFile(`./public/img/${imageName}`, outputBuffer);
      req.body.image = imageName;

      if (pet.image && pet.image !== 'paw.webp') {
        try {
          await fs.unlink(`./public/img/${pet.image}`);
        } catch (err) {
          if (err.code !== 'ENOENT') {
            throw err;
          }
        }
      }
    }

    // const updatedPet = await pet.update(req.body);
    await Pet.update(req.body, { where: { id: req.params.id } });
    const updatedPet = await Pet.findByPk(req.params.id);
    res.json(updatedPet);
  } catch (error) {
    console.error('Ошибка при обновлении питомца:', error);
    res.status(500).send('Internal server error');
  }
});

// DELETE одного питомца
petRouter.route('/:id').delete(async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      return res.status(404).send('Питомец не найден');
    }

    if (pet.image && pet.image !== 'paw.webp') {
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

    pet.requestStatusId = 2; // Assuming 2 is "approved"
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

    pet.requestStatusId = 4; // Assuming 4 is "rejected"
    await pet.save();
    res.json(pet);
  } catch (error) {
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

    pet.requestStatusId = 2; // Assuming 2 is "approved"
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

    pet.requestStatusId = 4; // Assuming 4 is "rejected"
    await pet.save();
    res.json(pet);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

module.exports = petRouter;
