//npm modules
import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import session from "express-session";
import cookie from "cookie-parser";
import expressValidator from "express-validator";
import mongoose from "mongoose"; //for production
import connectMongo from "connect-mongo"; //for production
// import flash from "connect-flash";
import passport from "passport";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import compression from "compression";


//local modules
import webpackConfig from "./webpack.config";
import addUser from "./server/routes/addUser";
import login from "./server/routes/login";
import dashboard from "./server/routes/dashboard";

const app = express();
const compiler = webpack(webpackConfig);

if(process.env.NODE_ENV.trim() == "development") {
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    noInfo: true,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));

  // app.get("/*", (req, res) => {
  //   res.sendFile(__dirname, "src", "index.html");
  // });

  // for different routes than "/" to be able to reload page and not get error
  app.get("/*", function (req, res, next) {
    const filename = path.join(compiler.outputPath, "index.html");
    compiler.outputFileSystem.readFile(filename, function(err, result){
      if (err) {
        return next(err);
      }
      if(req.url === "/api/dashboard") return next();

      res.set("content-type","text/html");
      res.send(result);
      res.end();
    });
  });

  app.use(logger("dev"));
}

if(process.env.NODE_ENV.trim() == "production") {
  app.use(compression());
  app.use(express.static(path.join(__dirname, "dist")));
}

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/workRecords");

const MongoStore = connectMongo(session); //for production

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
addUser(app); //POST
app.use("/api/login", login); //POST
app.use("/api/dashboard", dashboard); //GET
app.use("/api/dashboard/updateWorkTime", dashboard); //PUT

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} in ${process.env.NODE_ENV}mode`);
});
