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
    return queryInterface.bulkInsert('VegetableTags', [
      {
        veg_id: 1,
        tag_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        veg_id: 2,
        tag_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        veg_id: 3,
        tag_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        veg_id: 4,
        tag_id: 1,
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
    return queryInterface.bulkDelete('VegetableTags', null, {});
  }
};
