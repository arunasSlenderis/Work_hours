import passport from "passport";
import { Strategy } from "passport-local";

import User from "../../DB/models/User";

 // validation error handling
let validationErrors;
const isErrors = (errors) => {
  const errorMessages = [];
  if(errors) {
    errors.forEach(error => errorMessages.push(error.msg));
    return errorMessages;
  }
  return false;
};

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

passport.use("local.addUser", new Strategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, (req, email, password, done) => {
  //validation
  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("name", "Name must contain only letters").isAlpha();
  req.checkBody("lastName", "Last name is required").notEmpty();
  req.checkBody("lastName", "Last name must contain only letters").isAlpha();
  req.checkBody("email", "E-mail is required").notEmpty();
  req.checkBody("email", "E-mail must be valid").isEmail();
  req.checkBody("password", "Password is required").notEmpty();
  req.checkBody("password2", "Passwords do not match").equals(password);

  validationErrors = isErrors(req.validationErrors());
  if(validationErrors) return done(null, false, validationErrors);

  User.findOne({"email": email}, (err, user) => {
    if(err) return done(err);

    if(user) return done(null, false, { message: "User exists" });

    const { name, lastName, userType } = req.body;
    const newUser = new User();
    newUser.name = name;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.userType = userType;

    newUser.save(err => {
      if(err) return done(err);

      return done(null, newUser);
    });
  });
}));

passport.use("local.login", new Strategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({ "email": email }, (err, user) => {
    if(err) return done(err);

    if(!user) return done(null, false, { message: "User does not exist" });

    if(!user.validPassword(password))
      return done(null, false, { message: "Password is wrong" });

    return done(null, user);
  });
}));
