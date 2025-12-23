import "dotenv/config";
import { defineConfig } from "prisma/config";
import dotenv from "dotenv"
dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    url: "postgresql://neondb_owner:npg_PuIzJGF9Wp3D@ep-flat-cherry-a1vav18y-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});


