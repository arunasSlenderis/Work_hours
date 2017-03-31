import passport from "passport";
import express from "express";
import jwt from "jsonwebtoken";

import validateInput from "../../shared/loginValidation";
import config from "../config/jwtConfig";

const router = express.Router();

router.post("/", (req, res, next) => {
  const { errors, isValid } = validateInput(req.body);

  if(isValid) {
    passport.authenticate("local.login", (err, user, info) => {
      if(err) return next(err);
      if(!user) return res.status(400).json(info);
      if(user) {
        // creating jwt token
        const token = jwt.sign({
          id: user._id,
          username: user.email,
          userType: user.userType
        }, config.jwtSecret);
        res.json({ token });
      }
    })(req, res, next);
  } else {
    res.status(400).json(errors);
  }
});

export default router;
