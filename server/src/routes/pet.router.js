const petRouter = require('express').Router();
const { Pet, User, PetStatus, Category, Color, RequestStatus } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const upload = require('../middlewares/multer.middleware');
const sharp = require('sharp');
const fs = require('fs/promises');
const { verifyAdmin } = require('../middlewares/verifyAdmin');

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
      // Use default image
      const defaultImageBuffer = await fs.readFile(defaultImagePath);
      imageName = `${Date.now()}_default.webp`;
      await fs.writeFile(`./public/img/${imageName}`, defaultImageBuffer);
    }

    const pet = await Pet.create({
      ...req.body,
      image: imageName,
      userId: res.locals.user.id,
      requestStatusId: 1,
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
