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
    return queryInterface.bulkInsert('Tags', [
      {
        nameTag: 'sayur hijau',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nameTag: 'sayur buah',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nameTag: 'sayur umbi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
