import passport from "passport";
import passportLocal from "passport-local";

const LocalStrategy = passportLocal.Strategy;

import User from "../../DB/models/User";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use("local.addUser", new LocalStrategy({
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

  const validationErrors = req.validationErrors();
  if(validationErrors) {
    const messages = [];
    validationErrors.forEach(error => messages.push(error.msg));
    return done(null, false, messages);
  }

  User.findOne({"email": email}, (err, user) => {
    if(err)
      return done(err);

    if(user)
      return done(null, false, { message: "User exists" });

    const newUser = new User();
    newUser.name = req.body.name;
    newUser.lastName = req.body.lastName;
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.userType = req.body.userType;

    newUser.save(err => {
      if(err)
        return done(err);

      return done(null, newUser);
    });
  });
}));

passport.use("local.login", new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, (req, email, password, done) => {
  req.checkBody("email", "E-mail is required").notEmpty();
  req.checkBody("email", "E-mail must be valid").isEmail();
  req.checkBody("password", "Password is required").notEmpty();

  const validationErrors = req.validationErrors();
  if(validationErrors) {
    const messages = [];
    validationErrors.forEach(error => messages.push(error.msg));
    return done(null, false, messages);
  }

  User.findOne({"email": email}, (err, user) => {
    if(err)
      return done(err);

    if(!user)
      return done(null, false, { message: "User does not exist" });

    if(!user.validPassword(password))
      return done(null, false, { message: "Password is wrong" });

    return done(null, user);
  });
}));
