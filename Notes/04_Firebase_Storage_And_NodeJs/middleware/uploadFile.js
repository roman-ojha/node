import multer from "multer";
import crypto from "crypto";
import path from "path";

// here using 'diskStorage' it will store the image temprorariliy inside the temp folder and also return the path of the file through that we can use that path and upload to firebase
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, buf) => {
      const filename = buf.toString("hex") + path.extname(file.originalname);
      cb(null, filename);
    });
  },
});
export default multer({ storage });
