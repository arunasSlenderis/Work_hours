//npm modules
import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import session from "express-session";
import cookie from "cookie-parser";
import expressValidator from "express-validator";
import mongoose from "mongoose"; //for production
import connectMongo from "connect-mongo"; //for production
import flash from "connect-flash";
import passport from "passport";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

//local modules
import getAllUsers from "./server/routes/getAllUsers";
import addUser from "./server/routes/addUser";
import login from "./server/routes/login";
import User from "./DB/models/User";
import webpackConfig from "./webpack.config";

const app = express();
const compiler = webpack(webpackConfig);

if(process.env.NODE_ENV.trim() == "development") {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));

  app.get("/", (req, res) => {
    res.sendFile(path.resolve("./src/index.html"));
  });
}

if(process.env.NODE_ENV.trim() == "production") {
  app.use(express.static(path.join(__dirname, "dist")));
}

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/workRecords");

const MongoStore = connectMongo(session); //for production

require("./server/config/passport");

const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

app.use(cookie());
app.use(session({
  secret: "80crnpnfqyo8nynqbfpn9UNEFNPUSDBQ[A]",
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }) //for production
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//routes
getAllUsers(app, User); //GET
addUser(app); //POST
login(app); //POST

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
