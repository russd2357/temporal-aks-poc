import express, { response } from "express";
import DoctorController from "../controllers/doctor";
import HospitalController from "../controllers/hospital";
import NotificationController from "../controllers/notify";
import PingController from "../controllers/ping";


const router = express.Router();

router.get("/ping", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

router.post("/onboard/doctor", async (_req, res) => {
    const controller = new DoctorController();
    const response = await controller.assignDoctor();
    return res.send(response);
});

router.post("/onboard/hospital", async (_req, res) => {
    const controller = new HospitalController();
    const response = await controller.assignHospital();
    return res.send(response);
});

router.post("/onboard/notify", async (_req, res) => {
    const controller = new NotificationController();
    let contactinfo = (_req.query && _req.query.contactinfo) ? (_req.query as any).contactinfo as string : "";
    const response = await controller.notifyPatient(contactinfo);
    return res.send(response);
});



export default router