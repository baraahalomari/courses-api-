'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
      await queryInterface.bulkInsert(
        "Users",
        [
          {
            username: "dfiras",
            name: "firas",
            phone: "0786178460",
            age: 25,
          },
          {
            username: "dfiras",
            name: "firas",
            phone: "0786178460",
            age: 25,
          },
        ],
        {}
      );
    
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
