import { Pool } from "pg";
import Config from "../config";

export default new Pool({
  connectionString: Config.databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});
