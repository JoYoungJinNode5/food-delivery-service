import multerS3 from 'multer-s3';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { S3Client } from '@aws-sdk/client-s3';
import {
  AWS_BUCKET_NAME,
  AWS_REGION,
  AWS_S3_ACCESS_KEY,
  AWS_S3_SECRET_KEY,
  IMAGE_PARAM_NAME,
} from '../constants/file.constant.js';
import { MAX_REVIEW_IMAGE } from '../constants/review.constant.js';
import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY,
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new HttpError.Unauthorized(MESSAGES.FILE.INVALID_FORMAT), false);
  }

  cb(null, true);
};

const createMulter = (folderName) => {
  return multer({
    storage: multerS3({
      s3: s3Client,
      bucket: AWS_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `${folderName}/${uuidv4()}${ext}`);
      },
    }),
    fileFilter: imageFileFilter,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
  });
};

const setMaxFile = (folderName) => {
  switch (folderName) {
    case 'review':
      return MAX_REVIEW_IMAGE;
    default:
      return 1;
  }
};

const fileUploadMiddleware = (folderName, jsonFieldName = 'data') => {
  const upload = createMulter(folderName).array(IMAGE_PARAM_NAME, setMaxFile(folderName));

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return next(err);
      }

      try {
        if (req.body[jsonFieldName]) {
          const parsedData = JSON.parse(req.body[jsonFieldName]);
          req.body = parsedData;
        }
        next();
      } catch (error) {
        next(error);
      }
    });
  };
};

const fileDeleteMiddleware = (folderName) => {
  const upload = createMulter(folderName).array(IMAGE_PARAM_NAME, setMaxFile(folderName));

  return (req, res, next) => {
    s3Client.deleteObject;
  };
};

export { fileUploadMiddleware };
