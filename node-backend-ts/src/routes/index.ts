import express, { response } from "express";
import { resolve } from "path";
import DoctorController from "../controllers/doctor";
import PingController from "../controllers/ping";

const router = express.Router();

router.get("/ping", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

router.post("/doctor", async (_req, res) => {
    const controller = new DoctorController();
    const response = await controller.onboardDoctor();
    return res.send(response);
});

export default router;