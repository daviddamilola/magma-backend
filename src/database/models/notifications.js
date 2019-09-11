export default (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event: {
      type: DataTypes.ENUM,
      values: ['newRequest', 'approvedRequest', 'requestComment', 'closedRequest'],
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  }, {});
  Notifications.associate = models => {
    Notifications.belongsTo(models.User, {
      as: 'notification',
      foreignKey: 'userId',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
    Notifications.belongsTo(models.User, {
      as: 'email',
      foreignKey: 'userEmail',
      targetKey: 'email',
      onDelete: 'CASCADE'
    });
    Notifications.belongsTo(models.User, {
      as: 'enableNotification',
      foreignKey: 'enabled',
      targetKey: 'enableNotification',
      onDelete: 'CASCADE'
    });
  };
  return Notifications;
};
