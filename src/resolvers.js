const { prisma } = require("./database.js");

const Query = {
    allUsers: (parent, args) => {
      return prisma.user.findMany({});
    },
  };

const resolvers = {Query};

module.exports = {
    resolvers,
}
