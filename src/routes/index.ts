import { Hono } from "hono";
import { reportRoutes } from "./report.route";

const apiRoutes = new Hono();

apiRoutes.route("/reports", reportRoutes);
export { apiRoutes };
