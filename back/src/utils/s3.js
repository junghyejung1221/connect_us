const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
require("dotenv").config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const fileFilter = (req, file, cb) => {
  const typeArray = file.mimetype.split("/");
  const fileType = typeArray[1];
  if (
    fileType == "jpg" ||
    fileType == "png" ||
    fileType == "jpeg" ||
    fileType == "gif" ||
    fileType == "webp"
  ) {
    cb(null, true);
  } else {
    cb({ msg: "jpg, png, jpeg, gif, webp 파일만 업로드 가능합니다." }, false);
  }
};

let postImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, `posts/${Date.now()}_${file.originalname}`);
    },
  }),
  fileFilter: fileFilter,
});

let previewImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, `previews/${Date.now()}_${file.originalname}`);
    },
  }),
  fileFilter: fileFilter,
});

let userImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, `users/${Date.now()}_${file.originalname}`);
    },
  }),
  fileFilter: fileFilter,
});

let chatImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, `chat/${Date.now()}_${file.originalname}`);
    },
  }),
  fileFilter: fileFilter,
});

const deleteImg = (fileDir, fileName) => {
  s3.deleteObject(
    {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileDir.concat("/", fileName),
    },
    (err, data) => {
      if (err) console.log(err);
      else console.log(data);
    }
  );
};

exports.postImgUpload = multer(postImgUpload);
exports.previewImgUpload = multer(previewImgUpload);
exports.userImgUpload = multer(userImgUpload);
exports.chatImgUpload = multer(chatImgUpload);
exports.deleteImg = deleteImg;
