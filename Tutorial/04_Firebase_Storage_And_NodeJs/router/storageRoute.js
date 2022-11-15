// ------------------------------------------------
// documentation : https://www.sentinelstand.com/article/guide-to-firebase-storage-download-urls-tokens
import express from "express";
import storage from "../db/userStorageConnection.js";
const router = express.Router();
import upload from "../middleware/uploadFile.js";
import uuid from "uuid-v4";
const bucket = storage.bucket();
router.post("/u/post", upload.single("image"), async (req, res) => {
  const filename = req.file.filename;
  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: uuid(),
    },
    cacheControl: "public, max-age=31536000",
  };
  const file = await bucket.upload(req.file.path, {
    destination: `images/${filename}`,
    gzip: true,
    metadata: metadata,
  });
  console.log(file);
  res.send("Sending");
});

export default router;

// to get the meta data
// storage
//   .bucket()
//   .file("1e026037c38b3ea71b1265ad3562afdb.jpg")
//   .getMetadata()
//   .then((res) => {
//     console.log(res);
//     console.log(res[0].metadata.firebaseStorageDownloadTokens);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// storage
//   .bucket()
//   .file("1e026037c38b3ea71b1265ad3562afdb.jpg")
//   .getMetadata()
//   .then((results) => {
//     const metadata = results[0];
//     console.log(`File: ${metadata.name}`);
//     console.log(`Bucket: ${metadata.bucket}`);
//     console.log(`Storage class: ${metadata.storageClass}`);
//     console.log(`Self link: ${metadata.selfLink}`);
//     console.log(`ID: ${metadata.id}`);
//     console.log(`Size: ${metadata.size}`);
//     console.log(`Updated: ${metadata.updated}`);
//     console.log(`Generation: ${metadata.generation}`);
//     console.log(`Metageneration: ${metadata.metageneration}`);
//     console.log(`Etag: ${metadata.etag}`);
//     console.log(`Owner: ${metadata.owner}`);
//     console.log(`Component count: ${metadata.component_count}`);
//     console.log(`Crc32c: ${metadata.crc32c}`);
//     console.log(`md5Hash: ${metadata.md5Hash}`);
//     console.log(`Cache-control: ${metadata.cacheControl}`);
//     console.log(`Content-type: ${metadata.contentType}`);
//     console.log(`Content-disposition: ${metadata.contentDisposition}`);
//     console.log(`Content-encoding: ${metadata.contentEncoding}`);
//     console.log(`Content-language: ${metadata.contentLanguage}`);
//     console.log(`Metadata: ${metadata.metadata}`);
//     console.log(`Media link: ${metadata.mediaLink}`);
//   })
//   .catch((err) => {
//     console.error("ERROR:", err);
//   });

// to get the fileUrl which work for a certain period of time
// const fileUrl = await storage
//   .bucket()
//   .file("1e026037c38b3ea71b1265ad3562afdb.jpg")
//   .getSignedUrl({
//     action: "read",
//     expires: new Date().setDate(new Date().getDate() + 1),
//   });
// console.log(fileUrl);

// downloadable Token
//  `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(pathToFile)}?alt=media&token=${downloadToken}`
