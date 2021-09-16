import { Pool, PoolConfig } from "pg";

const config: PoolConfig = {
  user: process.env.DB_USER || "workoutuser",
  host: process.env.DB_HOST || "127.0.0.1",
  database: process.env.DB_NAME || "workouttracker",
  password: process.env.DB_PASSWORD || "123",
  port: parseInt(process.env.DB_PORT as string) || 5432,
};

Object.entries(config).forEach((entry) => {
    console.log(entry)
    const [key, value] = entry;
  if (!value) {
    const message = `PostgresConfig.${key} is empty!`;
    throw new Error(message);
  }
});

export default new Pool(config);
