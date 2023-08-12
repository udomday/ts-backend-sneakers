import postgres from "postgres";
const sql = postgres("postgres://postgres:qqSspo225@localhost:5432/sneakersdb", {
    host: "localhost",
    port: 5432,
    database: "sneakersdb",
    username: "postgres",
    password: "root",
});
export default sql;
//# sourceMappingURL=db.js.map