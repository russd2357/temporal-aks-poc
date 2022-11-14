import express, { Application, Request, Response } from "express";
import Router from "./routes";

const app: Application = express();
const port = 9099;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send("Backend demo server");
    }
);

app.use(Router);

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    })
} catch (error: any) {
    console.error(`Error occurred: ${error.message}`);
}