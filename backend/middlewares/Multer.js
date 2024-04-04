import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Upload");
  },
  filename: function (req, file, cb) {
    var temp_file_arr = file.originalname.split(".");

    var temp_file_name = temp_file_arr[0];

    var temp_file_extension = temp_file_arr[1];

    cb(null, temp_file_name + "-" + Date.now() + "." + temp_file_extension);
  },
});
export const upload = multer({
  storage,
});

export default upload;
