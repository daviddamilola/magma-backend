
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Notifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userEmail: {
      type: Sequelize.STRING,
    },
    event: {
      type: Sequelize.ENUM,
      values: ['newRequest', 'approvedRequest', 'requestComment', 'closedRequest'],
      allowNull: false,
    },
    enabled: {
      type: Sequelize.BOOLEAN,
    },
    read: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Notifications')
};
