import bodyParser from "body-parser";
import { Application } from "express";
import { createExpressServer } from "routing-controllers";
import { AuthController } from "../controllers/auth.controller";

export const ExpressServerLoader = (): Application => {
  const app: Application = createExpressServer({
    cors: true,
    classTransformer: true,
    defaultErrorHandler: false,
    middlewares: [],
    controllers: [AuthController],
  });

  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(process.env.PORT);

  return app;
};
