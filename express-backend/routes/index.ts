import express, { response } from "express";
import DoctorController from "../controllers/doctor";
import HospitalController from "../controllers/hospital";
import NotificationController from "../controllers/notify";
import PingController from "../controllers/ping";


const router = express.Router();

/**
 * @openapi
 * /ping:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/ping", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

/**
 * @openapi
 * /onboard/doctor:
 *   post:
 *     summary: Assign a doctor
 *     tags: [Onboarding]
 *     responses:
 *       200:
 *         description: Doctor assigned successfully
 */
router.post("/onboard/doctor", async (_req, res) => {
    const controller = new DoctorController();
    const response = await controller.assignDoctor();
    return res.send(response);
});


/**
 * @openapi
 * /onboard/hospital:
 *   post:
 *     summary: Assign a hospital
 *     tags: [Onboarding]
 *     responses:
 *       200:
 *         description: Hospital assigned successfully
 */
router.post("/onboard/hospital", async (_req, res) => {
    const controller = new HospitalController();
    const response = await controller.assignHospital();
    return res.send(response);
});

/**
 * @openapi
 * /onboard/notify:
 *   post:
 *     summary: Send notification to patient
 *     tags: [Notifications]
 *     parameters:
 *       - in: query
 *         name: contactinfo
 *         schema:
 *           type: string
 *         description: Contact information for the patient
 *     responses:
 *       200:
 *         description: Notification sent successfully
 */
router.post("/onboard/notify", async (_req, res) => {
    const controller = new NotificationController();
    let contactinfo = (_req.query && _req.query.contactinfo) ? (_req.query as any).contactinfo as string : "";
    const response = await controller.notifyPatient(contactinfo);
    return res.send(response);
});


export default router