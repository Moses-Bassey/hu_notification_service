'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('notification_settings', 'receive_notifications', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.removeColumn('notification_settings', 'receive_notifications');
   
  }
};
