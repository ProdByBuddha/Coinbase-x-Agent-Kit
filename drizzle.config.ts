import { isConfig } from 'drizzle-orm';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default {
  driver: 'pg',
  dbCredentials: async () => {
    const { rows: [connectionDetails] } = await pool.query('SELECT host, port, user, password, database, ssl FROM pg_stat_user_tables');
    return {
      host: connectionDetails.host,
      port: connectionDetails.port,
      user: connectionDetails.user,
      password: connectionDetails.password,
      database: connectionDetails.database,
      ssl: connectionDetails.ssl
    };
  },
  verbose: true,
  strict: true,
  out: "./migrations", // Moved out property to the correct location
  dialect: "postgresql", // Added dialect property
} satisfies typeof isConfig;