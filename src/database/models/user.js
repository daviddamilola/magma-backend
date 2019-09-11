export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    gender: { type: DataTypes.ENUM('Male', 'Female', 'Other'),
      allowNull: true
    },
    enableNotification: { type: DataTypes.BOOLEAN, defaultValue: true },
    birthDate: { type: DataTypes.DATEONLY, allowNull: true },
    preferredLanguage: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: true },
    role: { type: DataTypes.STRING, allowNull: true },
    department: { type: DataTypes.STRING, allowNull: true },
    lineManager: { type: DataTypes.STRING, allowNull: true },
    phoneNumber: { type: DataTypes.STRING, allowNull: true }
  }, {});
  User.associate = models => {
    User.hasMany(models.Notifications, {
      as: 'notification',
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Notifications, {
      as: 'Email',
      foreignKey: 'userEmail',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Notifications, {
      as: 'enabled',
      foreignKey: 'enabled',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Request, {
      as: 'requester',
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
