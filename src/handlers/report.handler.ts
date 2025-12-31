import type { Context } from "hono";
import { reportsService } from "@/services/report.service";

export const reportHandler = {
  list: (c: Context) => {
    try {
      const reports = reportsService.list();
      return c.json(reports);
    } catch (error) {
      return c.json({ error: "Failed to fetch reports" }, 500);
    }
  },
};
