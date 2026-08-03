import { Router } from "express";
import healthCheckService from "./service.js";

const router = Router();

router.get("/healthCheck", healthCheckService);
router.get("/healthcheck", healthCheckService);
router.get("/", healthCheckService);

export default router;
