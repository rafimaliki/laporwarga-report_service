import app from "./index";

export default {
  port: process.env.PORT ? Number(process.env.PORT) : 5001,
  fetch: app.fetch,
};
