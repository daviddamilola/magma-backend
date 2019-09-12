module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    firstName: 'Tosin',
    lastName: 'Alabi',
    email: 'tosin@mail.com',
    password: '$2b$10$mnxlDiPZl.aUHVJJbe3foO7QKKcKqFuhwSwk4XbFQTAp1mdSG3TIC',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jibson',
    lastName: 'Onyekelu',
    email: 'naimatdavid@mail.com',
    password: '$2b$10$fiqEMlgnIeVVJjHpZrXlfePcqtdcAHe87g5MTrm6DSuIpX7PtPFEy',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Frank',
    lastName: 'Lampard',
    email: 'frank@gmail.com',
    password: '$2b$10$bOjFSE6/F7vK1aTptF20muw8Rm2aeS4ypwuMVWhV2WJwMvw.xdivK',
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Frank',
    lastName: 'alabi',
    email: 'frank123@gmail.com',
    password: '$2b$10$bWOgNEUdUwdwUTalAYe0YOXbbDqj2S5I9iRHig0CuJpPpx7z0OkjC',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Frank',
    lastName: 'alabi',
    email: 'viola10@gmail.com',
    password: '$2b$10$bWOgNEUdUwdwUTalAYe0YOXbbDqj2S5I9iRHig0CuJpPpx7z0OkjC',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {})
};
