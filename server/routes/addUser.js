import passport from "passport";

const addUser = (app) => {
  app.post("/addUser", (req, res, next) => {
    passport.authenticate("local.addUser", (err, user, info) => {
      if(err) return next(err);
      if(!user) return res.json(info);

      res.json(user);
    })(req, res, next);
  });
};

export default addUser;
