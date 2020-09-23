import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import { join } from "path";
import { User } from "./entities/User";

export const microConfig = {
  migrations: {
    path: join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
  type: "postgresql",
  dbName: "dismania",
  user: "ali_dis",
  password: "ali123",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
