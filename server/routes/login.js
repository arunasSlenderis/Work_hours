import passport from "passport";
import express from "express";

import validateInput from "../../shared/loginValidation";

const router = express.Router();

router.post("/", (req, res, next) => {
  const { errors, isValid } = validateInput(req.body);

  if(isValid) {
    passport.authenticate("local.login", (err, user, info) => {
      if(err) return next(err);
      if(!user) return res.status(400).json(info);
      res.redirect("/");
    })(req, res, next);
  } else {
    res.status(400).json(errors);
  }
});

export default router;
