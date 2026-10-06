
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Without this handler, pg keeps reusing an idle client whose connection the
// database (or a firewall) has already dropped, so every query fails until the
// process restarts. Handling the error lets pg evict the dead client.
pool.on("error", (error) => {
  console.error("Unexpected error on idle database client:", error.message);
});

export default pool;
