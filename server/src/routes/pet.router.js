const petRouter = require('express').Router();
const { Pet, User, PetStatus } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const upload = require('../middlewares/multer.middleware');
const sharp = require('sharp');
const fs = require('fs/promises');

// GET все питомцы
petRouter.route('/').get(async (req, res) => {
  try {
    const pets = await Pet.findAll({
      order: [['createdAt', 'DESC']],
      include: [{ model: PetStatus, attributes: ['status'] }],
    });
    res.json(pets);
  } catch (error) {
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
    res.status(500).send('Internal server error');
  }
});

const defaultImagePath = './public/img/paw.webp'

// POST новый питомец
petRouter.route('/add').post(upload.single('file'), /* verifyAccessToken */ async (req, res) => {
  try {
    let imageName = null;

    if (req.file) {
      imageName = `${Date.now()}.webp`;
      const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();
      await fs.writeFile(`./public/img/${imageName}`, outputBuffer);
    } else {
      // Use default image
      const defaultImageBuffer = await fs.readFile(defaultImagePath);
      imageName = `${Date.now()}_default.webp`;
      await fs.writeFile(`./public/img/${imageName}`, defaultImageBuffer);
    }

    const pet = await Pet.create({
      ...req.body,
      image: imageName,
      userId: 1 /* res.locals.user.id */,
    });

    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при добавлении записи', error });
  }
});


// UPDATE одного питомца
petRouter.route('/:id').patch(upload.single('file'), /*verifyAccessToken,*/ async (req, res) => {
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

      if (pet.image) {
        await fs.unlink(`./public/img/${pet.image}`);
      }
    }

    const updatedPet = await pet.update(req.body);
    res.json(updatedPet);
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error');
  }
});

// DELETE одного питомцы
petRouter.route('/:id').delete(async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      return res.status(404).send('Питомец не найден');
    }

    // if (pet.image) {
    //   await fs.unlink(`./public/img/${pet.image}`);
    // }

    await pet.destroy();
    res.send('Успешно удалено');
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error');
  }
});

module.exports = petRouter;
