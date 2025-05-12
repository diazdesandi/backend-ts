import { DataSource } from "typeorm";
import {User, Todo } from "@/entities";
import { env } from "./env";


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    synchronize: env.NODE_ENV === 'development',
    logging: env.NODE_ENV === 'development',
    entities: [User, Todo],
    subscribers: [],
    migrations: [],
    entitySkipConstructor: true,
  });