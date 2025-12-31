import { Hono } from "hono";
import { reportHandler } from "@/handlers/report.handler";

const reportRoutes = new Hono();

reportRoutes.get("/list", reportHandler.list);

export { reportRoutes };
