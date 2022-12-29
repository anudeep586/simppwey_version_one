

import { Knex } from 'knex';
import path = require('path');


interface IKnexConfig {
  [key: string]: Knex.Config;
}

const configs: IKnexConfig = {
  development: {
    client:"postgres",
    connection: async () => {
        return {
          host : 'localhost',
          port : 5432,
          user : 'postgres',
          password : "1",
          database : 'educate',
        };
      },
    debug:true,
    useNullAsDefault: true,
    pool: {
      min: 1,
      max: 20,
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'educate',
      user: 'postgres',
      password: '1',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'chats',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'educate',
      user: 'username',
      password: '1',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'educate',
    },
  },
};

export default configs;