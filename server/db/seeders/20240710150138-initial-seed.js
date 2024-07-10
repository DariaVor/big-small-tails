'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      username: 'John Doe Admin',
      email: "123@123",
      password: await bcrypt.hash('123', 10),
      isAdmin: true,
     },
     {
      username: 'John Doe',
      email: "1234@1234",
      password: await bcrypt.hash('1234', 10),
      isAdmin: false,
     }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
