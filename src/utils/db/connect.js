import pg from "pg";

const { Pool } = pg;

const pool = new Pool();

export const testDbConnection = async () => {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("Database connection is successful");
    } catch (error) {
        console.log("There was an error connecting to the database due to: ", error);
    }
};

export default pool;