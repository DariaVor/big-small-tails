'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Roles', [{ role: 'user' }, { role: 'admin' }], {});

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'Admin',
          email: 'admin@example.com',
          password: await bcrypt.hash('12345Aa!', 10),
          roleId: 2,
        },
        {
          username: 'Боб',
          email: 'user@example.com',
          password: await bcrypt.hash('12345Aa!', 10),
          roleId: 1,
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'PetStatuses',
      [{ status: 'Потерян' }, { status: 'Найден' }],
      {},
    );

    await queryInterface.bulkInsert(
      'Categories',
      [{ category: 'Собака' }, { category: 'Кот / Кошка' }, { category: 'Другое' }],
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
          name: 'Бобик',
          petStatusId: 2,
          categoryId: 2,
          colorId: 9,
          description: 'Нашел кота, но кажется он не хочет домой.',
          location: 'г. Москва, ул. Варшавское шоссе, д. 10',
          image: 'бобик.webp',
          hasCollar: false,
          contactInfo: '7(999)-987-65-43',
          date: '2024-07-11',
          requestStatusId: 1,
          userId: 2,
        },
        {
          name: 'Барсик',
          petStatusId: 1,
          categoryId: 2,
          colorId: 7,
          description: 'Потерял кота. Любит гулять на улице.',
          location: 'г. Санкт-Петербург, ул. Невский проспект, д. 1',
          image: 'cat2.jpg',
          hasCollar: false,
          contactInfo: '7(911)-123-45-67',
          date: '2024-01-15',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Шарик',
          petStatusId: 2,
          categoryId: 1,
          colorId: 5,
          description: 'Нашел собаку. Выглядит очень дружелюбно.',
          location: 'г. Екатеринбург, ул. Ленина, д. 50',
          image: 'dog1.jpg',
          hasCollar: false,
          contactInfo: '7(922)-654-32-18',
          date: '2024-02-20',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Мурка',
          petStatusId: 1,
          categoryId: 2,
          colorId: 8,
          description: 'Потерял кота, очень ласковый и домашний.',
          location: 'г. Новосибирск, ул. Красный проспект, д. 25',
          image: 'cat1.jpg',
          hasCollar: true,
          contactInfo: '7(913)-876-54-32',
          date: '2024-03-12',
          requestStatusId: 1,
          userId: 2,
        },
        {
          name: 'Дружок',
          petStatusId: 2,
          categoryId: 1,
          colorId: 1,
          description: 'Нашел собаку на улице, похоже потерялась.',
          location: 'г. Казань, ул. Баумана, д. 45',
          image: 'dog2.jpg',
          hasCollar: false,
          contactInfo: '7(905)-678-90-12',
          date: '2024-04-08',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Снежок',
          petStatusId: 1,
          categoryId: 2,
          colorId: 5,
          description: 'Потерял кота, пушистый.',
          location: 'г. Нижний Новгород, ул. Большая Покровская, д. 33',
          image: 'cat3.jpg',
          hasCollar: true,
          contactInfo: '7(906)-123-98-76',
          date: '2024-05-04',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Рекс',
          petStatusId: 2,
          categoryId: 1,
          colorId: 4,
          description: 'Нашел собаку, вероятно потерялась.',
          location: 'г. Самара, ул. Куйбышева, д. 22',
          image: 'dog3.jpg',
          hasCollar: true,
          contactInfo: '7(987)-543-21-09',
          date: '2024-06-01',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Василий',
          petStatusId: 1,
          categoryId: 2,
          colorId: 5,
          description: 'Потерял кота, серого цвета.',
          location: 'г. Омск, ул. Ленина, д. 18',
          image: 'cat4.jpg',
          hasCollar: true,
          contactInfo: '7(914)-345-67-89',
          date: '2024-07-14',
          requestStatusId: 1,
          userId: 2,
        },
        {
          name: 'Лайка',
          petStatusId: 1,
          categoryId: 1,
          colorId: 7,
          description: 'Потерял собаку, среднего размера.',
          location: 'г. Ростов-на-Дону, ул. Пушкинская, д. 77',
          image: 'dog5.jpg',
          hasCollar: true,
          contactInfo: '7(925)-123-45-67',
          date: '2024-07-03',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Мила',
          petStatusId: 2,
          categoryId: 2,
          colorId: 9,
          description: 'Нашел кошку, очень дружелюбная.',
          location: 'г. Челябинск, ул. Комсомольская, д. 5',
          image: 'cat5.jpg',
          hasCollar: false,
          contactInfo: '7(927)-654-32-18',
          date: '2024-06-21',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Тузик',
          petStatusId: 1,
          categoryId: 1,
          colorId: 8,
          description: 'Потерял собаку, откликается на "Тузик".',
          location: 'г. Уфа, ул. Проспект Октября, д. 105',
          image: 'dog6.jpg',
          hasCollar: true,
          contactInfo: '7(918)-876-54-32',
          date: '2024-06-18',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Мурзик',
          petStatusId: 2,
          categoryId: 2,
          colorId: 2,
          description: 'Нашел кота, очень игривый.',
          location: 'г. Пермь, ул. Сибирская, д. 35',
          image: 'cat6.jpg',
          hasCollar: false,
          contactInfo: '7(951)-678-90-12',
          date: '2024-05-23',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Белка',
          petStatusId: 1,
          categoryId: 1,
          colorId: 1,
          description: 'Потерял собаку, белого цвета.',
          location: 'г. Волгоград, ул. Ленина, д. 7',
          image: 'dog7.jpg',
          hasCollar: true,
          contactInfo: '7(903)-123-98-76',
          date: '2024-05-11',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Черныш',
          petStatusId: 2,
          categoryId: 2,
          colorId: 5,
          description: 'Нашел кота, серого цвета.',
          location: 'г. Краснодар, ул. Красная, д. 14',
          image: 'cat8.jpg',
          hasCollar: false,
          contactInfo: '7(964)-543-21-09',
          date: '2024-04-22',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Пушок',
          petStatusId: 1,
          categoryId: 2,
          colorId: 2,
          description: 'Потерял кота, очень пушистый.',
          location: 'г. Красноярск, ул. Мира, д. 41',
          image: 'cat7.jpg',
          hasCollar: false,
          contactInfo: '7(950)-345-67-89',
          date: '2024-04-13',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Рада',
          petStatusId: 2,
          categoryId: 1,
          colorId: 2,
          description: 'Нашел собаку, вероятно домашняя.',
          location: 'г. Воронеж, ул. Плехановская, д. 67',
          image: 'dog8.jpg',
          hasCollar: true,
          contactInfo: '7(993)-987-65-43',
          date: '2024-03-30',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Луна',
          petStatusId: 1,
          categoryId: 2,
          colorId: 7,
          description: 'Потерял кошку, серого цвета.',
          location: 'г. Саратов, ул. Чапаева, д. 25',
          image: 'cat9.jpg',
          hasCollar: false,
          contactInfo: '7(977)-123-45-67',
          date: '2024-03-18',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Гром',
          petStatusId: 2,
          categoryId: 1,
          colorId: 2,
          description: 'Нашел собаку, добрый.',
          location: 'г. Тюмень, ул. Республики, д. 10',
          image: 'dog10.jpg',
          hasCollar: false,
          contactInfo: '7(924)-654-32-18',
          date: '2024-03-05',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Зефир',
          petStatusId: 1,
          categoryId: 2,
          colorId: 5,
          description: 'Потерял кота, серый с зелеными глазами.',
          location: 'г. Иркутск, ул. Ленина, д. 16',
          image: 'cat10.jpg',
          hasCollar: false,
          contactInfo: '7(918)-876-54-32',
          date: '2024-02-27',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Султан',
          petStatusId: 2,
          categoryId: 1,
          colorId: 2,
          description: 'Нашел собаку, возможно потерялась.',
          location: 'г. Владивосток, ул. Светланская, д. 32',
          image: 'dog9.jpg',
          hasCollar: true,
          contactInfo: '7(909)-678-90-12',
          date: '2024-02-14',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Кузя',
          petStatusId: 1,
          categoryId: 2,
          colorId: 4,
          description: 'Потерял кота, рыжий и игривый.',
          location: 'г. Ульяновск, ул. Гончарова, д. 55',
          image: 'cat12.jpg',
          hasCollar: false,
          contactInfo: '7(902)-123-98-76',
          date: '2024-01-29',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Арчи',
          petStatusId: 2,
          categoryId: 1,
          colorId: 2,
          description: 'Нашел собаку, белый окрас.',
          location: 'г. Ярославль, ул. Андропова, д. 21',
          image: 'dog11.jpg',
          hasCollar: true,
          contactInfo: '7(981)-543-21-09',
          date: '2024-01-12',
          requestStatusId: 1,
          userId: 2,
        },
        {
          name: 'Лео',
          petStatusId: 1,
          categoryId: 2,
          colorId: 8,
          description: 'Потерял кота, молодой и активный.',
          location: 'г. Тула, ул. Советская, д. 60',
          image: 'cat11.jpg',
          hasCollar: true,
          contactInfo: '7(911)-345-67-89',
          date: '2024-06-20',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Буч',
          petStatusId: 2,
          categoryId: 1,
          colorId: 2,
          description: 'Нашел собаку, дружелюбная.',
          location: 'г. Калининград, ул. Ленинградская, д. 9',
          image: 'dog12.jpg',
          hasCollar: true,
          contactInfo: '7(952)-987-65-43',
          date: '2024-05-22',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Том',
          petStatusId: 1,
          categoryId: 2,
          colorId: 7,
          description: 'Потерял кота, двухцветный.',
          location: 'г. Рязань, ул. Ленина, д. 43',
          image: 'cat13.jpg',
          hasCollar: false,
          contactInfo: '7(978)-123-45-67',
          date: '2024-04-27',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Сэм',
          petStatusId: 2,
          categoryId: 1,
          colorId: 3,
          description: 'Нашел собаку, нужна помощь в поиске хозяина.',
          location: 'г. Пенза, ул. Московская, д. 20',
          image: 'dog13.jpg',
          hasCollar: true,
          contactInfo: '7(982)-654-32-18',
          date: '2024-03-19',
          requestStatusId: 1,
          userId: 2,
        },
        {
          name: 'Чарли',
          petStatusId: 1,
          categoryId: 1,
          colorId: 4,
          description: 'Потерял собаку, маленький размер.',
          location: 'г. Астрахань, ул. Победы, д. 44',
          image: 'dog14.jpg',
          hasCollar: true,
          contactInfo: '7(962)-876-54-32',
          date: '2024-02-06',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Ричи',
          petStatusId: 1,
          categoryId: 1,
          colorId: 3,
          description: 'Потерял собаку, откликается на "Ричи".',
          location: 'г. Липецк, ул. Ленина, д. 58',
          image: 'dog16.jpg',
          hasCollar: true,
          contactInfo: '7(920)-123-98-76',
          date: '2024-03-17',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Лаки',
          petStatusId: 1,
          categoryId: 3,
          colorId: 10,
          description: 'Потерял попугая.',
          location: 'г. Мурманск, ул. Полярная, д. 7',
          image: 'other1.jpg',
          hasCollar: false,
          contactInfo: '7(974)-543-21-09',
          date: '2024-06-09',
          requestStatusId: 2,
          userId: 2,
        },
        {
          name: 'Плюша',
          petStatusId: 1,
          categoryId: 3,
          colorId: 7,
          description: 'Потерял хомяка, пушистый и ласковый.',
          location: 'г. Владимир, ул. Студенческая, д. 39',
          image: 'other2.jpg',
          hasCollar: false,
          contactInfo: '7(929)-345-67-89',
          date: '2024-05-18',
          requestStatusId: 2,
          userId: 2,
        },
      ],
      {},
    );
  },
};
