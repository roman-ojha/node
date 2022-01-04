/*
-> firstly you have to install three library to compress the image
    -> npm i imagemin
    -> npm i imagemin-jpegtran
    -> npm i imagemin-pngquant
    -> npm i is-jpg
    -> npm i sharp
    -> npm i imagemin-mozjpeg

-> documentation:
    -> https://www.youtube.com/watch?v=3oXmDUH1u8Y&t=13s
    -> https://github.com/imagemin/imagemin
    -> https://www.npmjs.com/package/imagemin
*/

import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import isJpg from "is-jpg";
import sharp from "sharp";
import mozjpeg from "imagemin-mozjpeg";

const converToJpg = async (input) => {
  // here we are getting the image file on 'input'
  if (isJpg(input)) {
    // and we are checking is that file is jpg if yes then we are directly returing that file
    return input;
  }

  // but if that file is not jpg then we are converting to jpeg
  return sharp(input).jpeg().toBuffer();
};

(async () => {
  //   const files = await imagemin(["images/*.{jpg,png}"], {
  //     destination: "build/images",

  //     plugins: [
  //       imageminJpegtran({
  //         quality: [0.1, 0.1],
  //       }),
  //       imageminPngquant({
  //         quality: [0.0, 0.0],
  //       }),
  //     ],
  //   });

  // by using documentation this 'imagemin-jpegtran' and 'imagemin-pngquant' didnot compress the file so i have to use 'imagemin-mozjpeg' plugin which compress the jpeg file not png
  // so to convert the png file you can convert to jpg file by using 'convertToJpg' function
  const files = await imagemin(["images/*.{jpg,png}"], {
    // here we are getting images from 'images' folder and getting .{jpg,png} file only
    destination: "build/images",
    // and after compressiong we are storing the compressed image into 'build/images' folder
    plugins: [converToJpg, mozjpeg({ quality: 85 })],
    // here we are using 'convertToJpg' function which will convert the image into jpg formage
    // 'quelity' is the compressed quality
    // NOTE: file will store in the original formate but while compressing it will compress in jpeg formate only

    // plugins: [mozjpeg({ quality: 80 })],
    // here if the image formate is only jpeg then we don't have to convert other formate at that time we can use this method
  });
  console.log(files);
  //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
})();

// compress through buffer
const compressFile = async (buffer) => {
  const minFile = await imagemin.buffer(buffer, {
    plugins: [convertToJpg, mozjpeg({ quality: 80 })],
  });
  return minFile;
};
