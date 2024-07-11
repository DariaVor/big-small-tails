'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          role: 'user',
        },
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
      'AnimalStatuses',
      [
        {
          status: 'Потерян',
        },
        {
          status: 'Найден',
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          category: 'Собака',
        },
        {
          category: 'Кошка',
        },
        {
          category: 'Другое',
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Colors',
      [
        {
          color: 'Черный',
        },
        {
          color: 'Белый',
        },
        {
          color: 'Коричневый',
        },
        {
          color: 'Рыжий',
        },
        {
          color: 'Серый',
        },
        {
          color: 'Кремовый',
        },
        {
          color: 'Биколор (двухцветный)',
        },
        {
          color: 'Калико (трехцветный)',
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          category: 'Собака',
        },
        {
          category: 'Кошка',
        },
        {
          category: 'Другое',
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'RequestStatuses',
      [
        {
          status: 'Ожидает одобрения',
        },
        {
          status: 'Одобрено',
        },
        {
          status: 'Найдено',
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Animals',
      [
        {
          name: 'Басик',
          animalStatusId: 1,
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
          animalStatusId: 2,
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
