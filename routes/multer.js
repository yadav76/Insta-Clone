const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

//here I am writing where to Store the Image uploaded on Edit Page
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/images/uploads");
  },
  filename: function (req, file, cb) {
    //every time I want to make a unique name that's why used "uuid"
    const unique = uuidv4;

    //Now I have to add extension of file to unique Name like .png .jpg

    cb(null, unique + path.extname(file.originalname)); //this will extension
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
