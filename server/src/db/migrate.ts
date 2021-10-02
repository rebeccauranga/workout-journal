import pool from "./config";

const exercisesDDL = `
    CREATE TABLE IF NOT EXISTS exercises (
        id UUID PRIMARY KEY,
        category VARCHAR(50),
        name VARCHAR(50) UNIQUE,
        description TEXT,
        video_url VARCHAR(255)
    )
`;

const usersDDL = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      email VARCHAR(50) UNIQUE NOT NULL,
      photo_url TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
`;

const schema = [exercisesDDL, usersDDL];

schema.forEach(async (ddl) => {
  const res = await pool.query(ddl);
  console.log(res);
});
