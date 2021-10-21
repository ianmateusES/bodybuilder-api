import { createConnections, getConnectionOptions } from 'typeorm';

async function connection() {
  const [postgresConnection, mongoConnection] = await Promise.all([
    getConnectionOptions(),
    getConnectionOptions('mongo'),
  ]);

  Object.assign(postgresConnection, {
    host: process.env.HOST_POSTGRES || 'localhost',
    port: process.env.PORT_POSTGRES || 5432,
    username: process.env.USERNAME_POSTGRES || 'default',
    password: process.env.PASSWORD_POSTGRES || 'default',
    database: process.env.DATABASE_POSTGRES || 'default',
  });

  Object.assign(mongoConnection, {
    host: process.env.HOST_MONGO || 'localhost',
    port: process.env.PORT_MONGO || 27017,
    database: process.env.DATABASE_MONGO || 'default',
  });

  createConnections([postgresConnection, mongoConnection]);
}

connection();
