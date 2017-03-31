import express from "express";

const router = express.Router();

import User from "../../DB/models/User";
import authenticate from "../middlewares/authenticate";
import validateInput from "../../shared/addUserValidation";

router.post("/", authenticate, (req, res) => {
  const { errors, isValid } = validateInput(req.body);
  if(isValid) {
    const { name, lastName, email, password, admin } = req.body;

    User.findOne({ email }, (err, user) => {
      if(err) {
        res.status(400).json(err);
      }
      if(user) {
        res.status(400).json({ success: false, fail: true, text: "User already exists" });
      } else {
        const newUser = new User();

        newUser.name = name;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.userType = admin ? "admin" : "user";

        newUser.save(err => {
          if(err) {
            res.status(400).json(err);
          } else {
            res.json({ success: true, fail: false, text: "User added successfully" });
          }
        });
      }
    });

  } else {
    res.status(400).json(errors);
  }
});

export default router;
