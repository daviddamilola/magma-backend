module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    firstName: 'Tosin',
    lastName: 'Alabi',
    email: 'tosin@mail.com',
    password: '$2a$10$2lTVW5ppYCY1JOb3jkoz3e0f8M1D6bcoTVsObsk7WnhfqLjEJ1HDq',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jibson',
    lastName: 'Onyekelu',
    email: 'naimatdavid@mail.com',
    password: '$2a$10$2lTVW5ppYCY1JOb3jkoz3e0f8M1D6bcoTVsObsk7WnhfqLjEJ1HDq',
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
    firstName: 'madiba',
    lastName: 'nelson',
    email: 'madiba@gmail.com',
    password: '$2b$10$mnxlDiPZl.aUHVJJbe3foO7QKKcKqFuhwSwk4XbFQTAp1mdSG3TIC',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'notmadiba',
    lastName: 'notnelson',
    email: 'notmadiba@gmail.com',
    password: '$2b$10$mnxlDiPZl.aUHVJJbe3foO7QKKcKqFuhwSwk4XbFQTAp1mdSG3TIC',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {    
    firstName: 'Mathr',
    lastName: 'Jonson',
    email: 'mathyr@gmail.com',
    password: '$2b$10$s2GQR3odxFN2srZiHR0bYOBZnuhw0mqF4mM1eB/ZB0fHNjZWXHW6O',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {})
};
