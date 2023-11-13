const { Prisma } = require("@prisma/client");
const { prisma } = require("./database.js");
const { ForbiddenError, ApolloError } = require('apollo-server');


const Query = {
  // return all user
  allUsers: async (parent, args, context) => {
    const roleId = context.user.Role;

    // serach role
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
      select: {
        name: true,
      },
    });

    // validation current rol
    const allowedRoles = ["Manager", "Admin"];
    if (!role || !allowedRoles.includes(role.name)) {
      throw new ForbiddenError("No tiene permisos suficientes para realizar esta acción.");
    }

    return prisma.user.findMany({});
  },

  // return detail of user about role
  detailUser: async (parent, args, context) => {
    const { email } = args;
    const roleId = context.user.Role;
    const currentEmail = context.user.Email;

    // serach role
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
      select: {
        name: true,
      },
    });

    // validation current rol
    const allowedRoles = ["Manager", "Admin"];
    if (!role || !allowedRoles.includes(role.name)) {
      // rol type USER only serach self
      if (currentEmail !== email) {
        throw new Error("Solo puede consultar sus datos");
      }
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Usuario no encontrado.");
    }

    return user;
  },

  // return all country
  allCountry: async (parent, args, context) => {
    const roleId = context.user.Role;

    // serach role
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
      select: {
        name: true,
      },
    });

    // validation current rol
    const allowedRoles = ["Manager", "Admin"];
    if (!role || !allowedRoles.includes(role.name)) {
        throw new ForbiddenError("No tiene permisos suficientes para realizar esta acción.");
    }

    return prisma.country.findMany({});
  },

  // return all user monitorings by user and type rol
  allUserMonitoringByUser: async (parent, args, context) => {
    const { email, start_date, end_date } = args;
    const roleId = context.user.Role;
    const currentEmail = context.user.Email;

    // serach role
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
      select: {
        name: true,
      },
    });

    // validation current rol
    const allowedRoles = ["User", "Admin"];
    if (!role || !allowedRoles.includes(role.name)) {
        throw new ForbiddenError("No tiene permisos suficientes para realizar esta acción.");
    }

    // rol type USER only serach self
    if (currentEmail !== email) {
      throw new ForbiddenError("Solo puede consultar sus datos");
    }

    // get user
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new ApolloError("Usuario no encontrado.", 'USER_NOT_FOUND');
    }

    // get all userMonitoringUsers
    const userMonitorings = await prisma.userMonitoring.findMany({
      where: {
        userId: user.id,
        createdAt: {
          gte: new Date(start_date).toISOString(),
          lte: new Date(end_date).toISOString(),
        },
      },
      include: {
        User: true,
      },
    });

    return userMonitorings;
  },

  // get 3 first user with most register in UserMonitor
  obtainThreeUsersMostRecord: async (parent, args, context) => {
    const { start_date, end_date } = args;
    const roleId = context.user.Role;

    // serach role
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
      select: {
        name: true,
      },
    });

    // validation current rol
    const allowedRoles = ["Admin"];
    if (!role || !allowedRoles.includes(role.name)) {
      throw new Error("No tiene permiso de usuario.");
    }

    // get all userMonitoringUsers
    const userMonitorings = await prisma.userMonitoring.findMany({
      where: {
        createdAt: {
          gte: new Date(start_date).toISOString(),
          lte: new Date(end_date).toISOString(),
        },
      },
      include: {
        User: true,
      },
    });

    const sortedUserMonitorings = userMonitorings.sort(
      (a, b) => b.usage - a.usage
    );
    const topThreeUsers = sortedUserMonitorings.slice(0, 3);
    return topThreeUsers;
  },

  // get 3 first user thar has been (used: (signln, print o share)) with country and range date
  obtainThreeUsersMostRecordDependetStatus: async (parent, args, context) => {
    let { country_id, description, start_date, end_date } = args
    const roleId = context.user.Role;

    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
      select: {
        name: true,
      },
    });

    const allowedRoles = ["Admin"];
    if (!role || !allowedRoles.includes(role.name)) {
      throw new Error("No tiene permiso de usuario.");
    }

    const userMonitorings = await prisma.$queryRaw(
        Prisma.sql`
            SELECT DISTINCT UM."userId", UM.*
            FROM public."UserMonitoring" AS UM
            INNER JOIN public."User" AS U ON U."id" = UM."userId"
            INNER JOIN public."_CountryToUser" AS CTU ON CTU."B" = U."id"
            INNER JOIN public."Country" AS CO ON CO."id" = CTU."A"
            WHERE UM."description" = ${description}
                AND CO."id" = ${country_id}
                AND UM."createdAt" >= ${start_date}
                AND UM."createdAt" <= ${end_date}
            GROUP BY UM."userId", UM."id"
            ORDER BY UM."userId" DESC
            LIMIT 3;
        `
    );

    return userMonitorings;
  },
};

const resolvers = { Query };

module.exports = {
  resolvers,
};
