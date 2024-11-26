import * as functions from "firebase-functions";
import { createServer } from "http";
import { parse } from "url";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, conf: { distDir: ".next" } });
const handle = app.getRequestHandler();

export const nextServer = functions.https.onRequest((req, res) => {
  const parsedUrl = parse(req.url as string, true);
  handle(req, res, parsedUrl);
});
