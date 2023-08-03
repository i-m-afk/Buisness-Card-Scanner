// Supported Image Formats: bmp, jpg, png, pbm, webp
const imageTypes = [
  "image/bmp",
  "image/jpeg",
  "image/png",
  "image/x-portable-bitmap",
  "image/webp",
];

export function validFiles(files) {
  return imageTypes.incudes(files.type);
}

export function returnFileSize(number) {
  if (number < 1024) {
    return number + "bytes";
  } else if (number > 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + "KB";
  } else if (number > 1048576) {
    return (number / 1048576).toFixed(1) + "MB";
  }
}

export default imageTypes;
