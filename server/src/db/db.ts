import pool from "./config";
import { Exercise } from "../../../shared/models";

export async function listExercises(): Promise<Exercise[]> {
  const sql = "SELECT id, name, category, description, video_url FROM exercises;";
  const res = await pool.query(sql);
  return res.rows;
}

// NOTES
// ddl = data definition language (create table, create database)
// dml = data manipulation language (insert, update, delete)
// ALTER TABLE exercises ADD COLUMN category VARCHAR(50);
