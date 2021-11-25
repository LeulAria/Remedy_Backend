import express from "express";
import consola from "consola";
import { createDbConnection } from "./config/db";
import { startApolloServer } from "./apollo";
import cors from "cors";

const app = express();
app.use(cors());

(async () => {
  try {
    // connect to mongodb
    await createDbConnection();

    // start apollo server
    await startApolloServer(app);

    // start listening on server
    app.listen(process.env.PORT, () => {
      consola.success({
        badge: true,
        message: `Server running on http://localhost:${process.env.PORT}/graphql`,
      });
    });
  } catch (error) {
    consola.error({
      badge: true,
      message: error,
    });
  }
})();
