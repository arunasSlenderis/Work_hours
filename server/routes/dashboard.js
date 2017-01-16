import express from "express";

import User from "../../DB/models/User";
import authenticate from "../middlewares/authenticate";

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  User.find({}, (err, users) => {
    if(err) {
      res.json(err);
    } else {
      res.status(200).json(users);
    }
  });
});

export default router;
