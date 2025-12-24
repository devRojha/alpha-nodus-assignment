import multer from "multer";
import path from "path";
import fs from "fs";

const uploadBasePath = path.join(process.cwd(), "uploads");

["resumes", "coverletters"].forEach((dir) => {
  const fullPath = path.join(uploadBasePath, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination(_req, file, cb) {
    if (file.fieldname === "resume") {
      cb(null, path.join(uploadBasePath, "resumes"));
    } else if (file.fieldname === "coverLetter") {
      cb(null, path.join(uploadBasePath, "coverletters"));
    } else {
      cb(new Error("Invalid field name"), "");
    }
  },
  filename(_req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

export const uploadApplicationFiles = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files allowed"));
  },
});
