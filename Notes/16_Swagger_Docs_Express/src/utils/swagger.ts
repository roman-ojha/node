import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import log from "./logger";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0", // giving docs version
    info: {
      title: "REST API Docs", // title of the api docs
      version, // api version
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          // we are using bearer token for app authentication
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      // Providing different server to test the api
      {
        url: "http://localhost:1337",
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes.ts", "./src/schema/*.ts"], // files where openapi where defines
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  // Swagger page open in this endpoints
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format in this endpoints
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  log.info(`Docs available at http://localhost:${port}/docs`);
}
// Here first we build Swagger documentation then we will publish is to postman and that will be available to all the client and the developers automatically

export default swaggerDocs;
