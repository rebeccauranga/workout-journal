import { v4 as uuidv4 } from "uuid";
import pool from "./config";
import { User } from "../../../shared/models";

export async function createUser(
  email: string,
  photoUrl: string
): Promise<User> {
  const sql =
    "INSERT INTO users(id, email, photo_url) VALUES($1, $2, $3) RETURNING *";
  const values = [uuidv4(), email, photoUrl];
  const res = await pool.query(sql, values);
  return res.rows[0];
}

export async function findUserByEmail(email: string): Promise<User> {
  const sql =
    "SELECT id, email, photo_url, created_at FROM users WHERE email = $1";
  const values = [email];
  const res = await pool.query(sql, values);
  return res.rows[0];
}

export async function findUserById(id: string): Promise<User> {
    const sql =
      "SELECT id, email, photo_url, created_at FROM users WHERE id = $1";
    const values = [id];
    const res = await pool.query(sql, values);
    return res.rows[0];
  }

export async function findOrCreateUser(
  email: string,
  photoUrl: string
): Promise<User> {
  let user = await findUserByEmail(email);
  if (user) {
    return user;
  }
  return await createUser(email, photoUrl);
}
