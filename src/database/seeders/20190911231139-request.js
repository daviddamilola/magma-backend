module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Requests', [{
    userId: 1,
    origin: 'New York',
    destination: 'Tokyo',
    type: 'one-way',
    departureDate: '2019-12-25',
    reason: 'New office',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {})
};
