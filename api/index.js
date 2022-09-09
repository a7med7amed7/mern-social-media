const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const authRoute = require("./routes/auth");
const upload = require("./config/imgUploader");
const app = express();
dotenv.config();
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected to DB");
});

//Middlewares
app.use("/images", express.static(path.join(__dirname, "/public/images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "./public/images"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  console.log("Files ", req.file.filename)
  try {
    return res.status(200).json(req.file.filename);
  } catch (error) {
    console.error(error);
  }
});
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
  })
}

app.listen(8800, () => {
  console.log("Running ");
});
