//npm modules
import express from "express";
import bodyParser from "body-parser";
// import logger from "morgan";
import session from "express-session";
import cookie from "cookie-parser";
import expressValidator from "express-validator";
import mongoose from "mongoose"; //for production
import connectMongo from "connect-mongo"; //for production
// import flash from "connect-flash";
import passport from "passport";
import path from "path";
// import webpack from "webpack";
// import webpackDevMiddleware from "webpack-dev-middleware";
// import webpackHotMiddleware from "webpack-hot-middleware";
// import compression from "compression";
// import fs from "fs";


//local modules
// import webpackConfig from "./webpack.config";
import addUser from "./server/routes/addUser";
import addProject from "./server/routes/addProject";
import login from "./server/routes/login";
import dashboard from "./server/routes/dashboard";
import projects from "./server/routes/projects";
import usersList from "./server/routes/usersList";
import manageProjects from "./server/routes/manageProjects";

const app = express();
// const compiler = webpack(webpackConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/dashboard", dashboard); //GET
app.use("/api/projects", projects); //GET

// if(process.env.NODE_ENV.trim() == "development") {
//   app.use(webpackDevMiddleware(compiler, {
//     hot: true,
//     noInfo: true,
//     stats: {
//       colors: true
//     }
//   }));
//   app.use(webpackHotMiddleware(compiler));
//
//   // for different routes than "/" to be able to reload page and not get error
//   app.get("/*", function (req, res, next) {
//     const filename = path.join(compiler.outputPath, "index.html");
//     compiler.outputFileSystem.readFile(filename, function(err, result){
//       if (err) {
//         return next(err);
//       }
//       if(req.url === "/api/dashboard" || req.url === "/api/usersList") return next();
//
//       res.set("content-type","text/html");
//       res.send(result);
//       res.end();
//     });
//   });
//
//   app.use(logger("dev"));
// }

if(process.env.NODE_ENV.trim() == "production") {
  // app.use(compression());
  // app.use(express.static(path.join(__dirname, "dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
  // app.get("/*", function (req, res, next) {
  //   const filename = path.join(__dirname, "index.html");
  //   console.log("FILENAME: ",filename);
  //   console.log("DIRNAME: ",__dirname);
  //
  //   fs.readFile(filename, function(err, result){
  //     if (err) {
  //       return next(err);
  //     }
  //     if(req.url === "/api/dashboard" || req.url === "/api/usersList") return next();
  //
  //     res.set("content-type","text/html");
  //     res.send(result);
  //     res.end();
  //   });
  // });
}

mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost/workRecords"); DEV
mongoose.connect("mongodb://heroku_64qm85gh:ha8thplldf7djjlpbkrqf6r5pv@ds159050.mlab.com:59050/heroku_64qm85gh", err => {
  if(!err) {
    console.log("Mongo connected");
  }
}); //prod

const MongoStore = connectMongo(session); //for production

const PORT = process.env.PORT || 3001;

require("./server/config/passport");

app.use(expressValidator());

app.use(cookie());
app.use(session({
  secret: "80crnpnfqyo8nynqbfpn9UNEFNPUSDBQ[A]",
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }) //for production
}));
// app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/addUser", addUser); //POST
app.use("/api/addProject", addProject); //POST
app.use("/api/login", login); //POST
app.use("/api/usersList", usersList); //GET
app.use("/api/usersList/updateUser", usersList); //PUT
app.use("/api/usersList/deleteUser", usersList); //DELETE
app.use("/api/manageProjects/deleteProject", manageProjects); //DELETE
app.use("/api/manageProjects/updateProject", manageProjects); //PUT
app.use("/api/usersList/assignProjects", usersList); //PUT
app.use("/api/updateHours", projects); //PUT

app.use("/api/dashboard/updateWorkTime", dashboard); //PUT

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} in ${process.env.NODE_ENV}mode`);
});
