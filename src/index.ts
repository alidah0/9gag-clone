import { join } from "path";
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import { Post } from "./entities/Posts";

const main = async () => {
  await createConnection({
    type: "postgres",
    url: "",
    logging: true,
    // synchronize: true,
    migrations: [join(__dirname, "./migrations/*")],
    entities: [Post],
  }).then((connection) => {
    let post = new Post();
    post.title = "xxxxxxxxxx";
    return connection.manager.save(post).then((photo) => {
      console.log("Photo has been saved. Photo id is", photo.id);
    });
  });
};

main().catch((err) => {
  console.error(err.message);
});
