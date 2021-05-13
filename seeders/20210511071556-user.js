"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "sherlock@email.com",
          password: "$2b$10$cAoCzTuQGbi.gC1m.9KTEOGZb3zpObyeJTqwIEegnV6NwMFUJB63G",
          name: "Sherlock Holmes",
          phone: 0,
          type: "client",
          location: queryInterface.sequelize.fn("GeomFromText", "POINT(121.12 -39.66)"),
        },
        {
          email: "john@email.com",
          password: "$2b$10$cs1q/42GabZVieAVpRwZN.T1poCcfiKl4pmvxHJK8vLOA/mUHrgYe",
          name: "Mary Watson",
          phone: 0,
          type: "driver",
          location: queryInterface.sequelize.fn("GeomFromText", "POINT(156.54 -33.67)"),
        },
        {
          email: "driver1@email.com",
          password: "$2b$10$SNd1qErU0U498GD5umt8E.jdw6nPKAd08y7Itvk.IgwY7/wDyJg12",
          name: "Driver One",
          phone: 0,
          type: "driver",
          location: queryInterface.sequelize.fn("GeomFromText", "POINT(178.86 -35.11)"),
        },
        {
          email: "driver2@email.com",
          password: "$2b$10$i5EMAdvjTA5KoEyl8Ahez.oxub/nwRxA.QnplH.tmpD9x0mSRx3r2",
          name: "Driver Two",
          phone: 0,
          type: "driver",
          location: queryInterface.sequelize.fn("GeomFromText", "POINT(131.56 -44.08)"),
        },
        {
          email: "driver3@email.com",
          password: "$2b$10$kGRPa41QY5bU9rv21srcB.G2UZzE0GNUGqxYh3q8quVy4bTdzVUl2",
          name: "Driver Three",
          phone: 0,
          type: "driver",
          location: queryInterface.sequelize.fn("GeomFromText", "POINT(151.17 -35.67)"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
