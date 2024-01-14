const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const multer = require('multer');
const path = require('path'); 


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });


const mainRouter = require("./routes/routes");
const departmentRouter = require("./routes/deptroutes");
const departmentHeadRouter=require("./routes/depthead")
const employeeRouter=require("./routes/employees");
app.use('', departmentRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('',departmentHeadRouter);
app.use('', mainRouter);
app.use('',employeeRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = 3002;

async function startServer() {
  try {
    await mongoose.connect("mongodb://localhost:27017/hospital", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");

    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

startServer();
