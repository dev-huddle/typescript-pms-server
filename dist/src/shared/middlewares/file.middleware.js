"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileMiddleware = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new client_s3_1.S3Client({
    region: `${process.env.AWS_S3_REGION}`,
});
const s3_storage = multerS3({
    s3: s3,
    bucket: `${process.env.AWS_S3_STORAGE_BUCKET}`,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        cb(null, Date.now().toString());
    },
});
exports.fileMiddleware = multer({
    storage: s3_storage,
});
//# sourceMappingURL=file.middleware.js.map