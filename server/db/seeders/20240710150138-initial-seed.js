'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        { role: 'user' },
        { role: 'admin' },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'John Doe Admin',
          email: '123@123',
          password: await bcrypt.hash('123', 10),
          roleId: 2,
        },
        {
          username: 'John Doe',
          email: '1234@1234',
          password: await bcrypt.hash('1234', 10),
          roleId: 1,
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'PetStatuses',
      [
        { status: 'Потерян' },
        { status: 'Найден' },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Categories',
      [
        { category: 'Собака' },
        { category: 'Кот / Кошка' },
        { category: 'Другое' },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Colors',
      [
        { color: 'Черный' },
        { color: 'Белый' },
        { color: 'Коричневый' },
        { color: 'Рыжий' },
        { color: 'Серый' },
        { color: 'Кремовый' },
        { color: 'Биколор (двухцветный)' },
        { color: 'Калико (трехцветный)' },
        { color: 'Табби (полосатый)' },
        { color: 'Другой' },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'RequestStatuses',
      [
        { status: 'Ожидает одобрения' },
        { status: 'Одобрено' },
        { status: 'Найдено' },
        { status: 'Отклонено' },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Pets',
      [
        {
          name: 'Басик',
          petStatusId: 1,
          categoryId: 2,
          colorId: 1,
          description: 'Помогите найти',
          location: '55.706570,37.597090',
          image: 'басик.webp',
          hasCollar: true,
          contactInfo: '+7(999)-999-99-99',
          date: '2024-07-11',
          requestStatusId: 1,
          userId: 2,
        },
        {
          name: 'Бобик',
          petStatusId: 2,
          categoryId: 2,
          colorId: 2,
          description: 'Нашел кота',
          location: '55.706570,37.597090',
          image: 'бобик.webp',
          hasCollar: false,
          contactInfo: '+7(999)-999-99-99',
          date: '2024-06-11',
          requestStatusId: 1,
          userId: 2,
        },
        {
          name: 'Шарик',
          petStatusId: 1,
          categoryId: 1,
          colorId: 4,
          description: 'Пропала собака',
          location: '55.706570,37.597091',
          image: 'шарик.webp',
          hasCollar: true,
          contactInfo: '+7(999)-999-99-99',
          date: '2024-07-01',
          requestStatusId: 1,
          userId: 2,
        },
        {
          name: 'Мурзик',
          petStatusId: 2,
          categoryId: 2,
          colorId: 5,
          description: 'Нашел кота',
          location: '55.706570,37.597092',
          image: 'басик.webp',
          hasCollar: false,
          contactInfo: '+7(999)-999-99-99',
          date: '2024-06-15',
          requestStatusId: 1,
          userId: 2,
        },
        {
          name: 'Рекс',
          petStatusId: 1,
          categoryId: 1,
          colorId: 3,
          description: 'Ищем потерявшегося пса',
          location: '55.706570,37.597093',
          image: 'шарик.webp',
          hasCollar: true,
          contactInfo: '+7(999)-999-99-99',
          date: '2024-07-05',
          requestStatusId: 1,
          userId: 1,
        },
        {
          name: 'Барсик',
          petStatusId: 2,
          categoryId: 2,
          colorId: 6,
          description: 'Кот найден',
          location: '55.706570,37.597094',
          image: 'басик.webp',
          hasCollar: false,
          contactInfo: '+7(999)-999-99-99',
          date: '2024-06-20',
          requestStatusId: 1,
          userId: 1,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
