const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// handle connection errors
prisma.$connect()
  .then(() => console.log('###### Connect at DB 🚀🚀🚀🚀🚀 ######'))
  .catch((error) => {
    console.error('Error al conectar a la base de datos: ', error);
    process.exit(1); 
  })

module.exports = {
  prisma,
}
