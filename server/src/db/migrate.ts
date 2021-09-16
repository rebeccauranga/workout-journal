import pool from "./config";

const exercisesDDL = `
    CREATE TABLE exercises (
        id UUID PRIMARY KEY,
        category VARCHAR(50),
        name VARCHAR(50),
        description TEXT,
        video_url VARCHAR(255)
    )
`;

const schema = [exercisesDDL];

schema.forEach(async (ddl) => {
  const res = await pool.query(ddl);
  console.log(res);
});
