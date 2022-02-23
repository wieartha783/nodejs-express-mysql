'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return Promise.all([
      queryInterface.addColumn(
        'todolists', // table name
        'done', // new field name
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
      ),
      queryInterface.addColumn(
        'todolists',
        'deadline',
        {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
      ),
       
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return Promise.all([
      queryInterface.removeColumn('todolists', 'done'), 
      queryInterface.removeColumn('todolists', 'deadline'), 
    ]);
  }
};
