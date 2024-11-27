import * as functions from "firebase-functions";
import next from "next";

const nextApp = next({
  dev: false,
  conf: { distDir: ".next" }, // Specify the correct directory
});

const handle = nextApp.getRequestHandler();

export const nextServer = functions.https.onRequest(async (req, res) => {
  await nextApp.prepare();
  handle(req, res);
});
