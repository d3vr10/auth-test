import { defineConfig } from "drizzle-kit"
import { DB_CONNECTION_URL } from "src/modules/db/db.provider"

const config = defineConfig({
    dialect: "postgresql",
    schema: ["src/modules/db/schema/"],
    out: "drizzle/",
    dbCredentials: {
        url: DB_CONNECTION_URL,
    }
})

export default config;
