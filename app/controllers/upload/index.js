const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { returnResponse } = require("../../utils");

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG and GIF are allowed."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return returnResponse(res, 400, {
        message: "No file uploaded",
      });
    }

    return returnResponse(res, 200, {
      message: "Image uploaded successfully",
      data: {
        filename: req.file.filename,
        path: req.file.path,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return returnResponse(res, 500, {
      message: "Error uploading image",
      error: error.message,
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join("uploads", filename);

    if (!fs.existsSync(filePath)) {
      return returnResponse(res, 404, {
        message: "Image not found",
      });
    }

    fs.unlinkSync(filePath);

    return returnResponse(res, 200, {
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return returnResponse(res, 500, {
      message: "Error deleting image",
      error: error.message,
    });
  }
};

module.exports = {
  upload,
  uploadImage,
  deleteImage,
};
