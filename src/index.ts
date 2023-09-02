import "express-async-errors";
import express from "express";
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import dbConnect from "./db/connect";

// Extra security
import helmet from "helmet";
import cors from "cors";
// import rateLimiter from "express-rate-limit";
import xss from "./middleware/xssMiddleware";

// Swagger documentation
// import swaggerUI, { JsonObject } from "swagger-ui-express";
// import YAML from "yamljs";

// const swaggerDocument = YAML.load("./swagger.yaml") as JsonObject;

const app = express();

// const apiLimiter = rateLimiter({
//   windowMs: 15 * 60 * 1000,
//   message:
//     "Too many API request from this IP, please try again after fifteen minutes",
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// middleware
app.set("trust proxy", 1);
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.use(xss);

app.use(express.static("./src/client/build"));

app.get("/", (_req, res) => {
  res.send("<h1>Email Project</h1><a href='/send'>Send email</a>");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await dbConnect();
    console.log("CONNECTED TO THE DB...");
    app.listen(port, () => {
      console.log(`Server is listening on ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

void start();
