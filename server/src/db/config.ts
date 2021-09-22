import { Pool, PoolConfig } from "pg";
import Config from "../config"

const config: PoolConfig = {
  user: Config.dbUser,
  host: Config.dbHost,
  database: Config.dbName,
  password: Config.dbPassword,
  port: Config.dbPort,
};

export default new Pool(config);
