'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Animals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      animalStatusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'AnimalStatuses',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      colorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Colors',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      description: {
        type: Sequelize.TEXT
      },
      location: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      hasCollar: {
        type: Sequelize.BOOLEAN
      },
      contactInfo: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE,
      },
      requestStatusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'RequestStatuses',
          key: 'id'
        },
        onDelete: 'CASCADE',
        defaultValue: 1,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Animals');
  }
};