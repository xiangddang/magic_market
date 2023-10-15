import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { Storage } from "@google-cloud/storage";
import { format } from "util";
import market from "./api/market.route.js";

dotenv.config();
const bucketName = process.env.BUCKET_NAME || "YOUR_BUCKET_NAME";
const projectId = process.env.PROJECT_ID || "YOUR_PROJECT_ID";
const app = express();

app.use(cors());
app.use(express.json());

const storage = new Storage({
  projectId: projectId,
});
const bucket = storage.bucket(bucketName);

const multerMiddleware = multer({ storage: multer.memoryStorage() });

app.post("/product/image", multerMiddleware.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobStream.on("error", (error) => {
    console.error("Error uploading to GCS:", error);
    res.status(500).send("Error uploading to GCS.");
  });

  blobStream.on("finish", () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

app.use("/api/v1", market);
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
