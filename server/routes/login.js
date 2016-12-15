import passport from "passport";

const login = (app) => {
  app.post("/login", (req, res, next) => {
    passport.authenticate("local.login", (err, user, info) => {
      if(err) return next(err);
      if(!user) return res.json(info);

      res.json(user);
    })(req, res, next);
  });
};

export default login;
