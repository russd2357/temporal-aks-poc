import express, {Application, Request, Response } from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";

import Router from "./routes";

const app: Application = express();
const port = 9099;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(express.static("publc"));

app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(undefined, {
        swaggerOptions: {
            url: "./public/swagger.json"
        },
    })
);

app.use(Router);

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occurred: ${error.message}`);
}