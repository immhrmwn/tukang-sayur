'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Vegetables', [
      {
        name: 'bayam',
        stock: 100,
        price: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'wortel',
        stock: 55,
        price: 1500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'pakcoy',
        stock: 90,
        price: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'brocoli',
        stock: 30,
        price: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Vegetables', null, {});
  }
};
