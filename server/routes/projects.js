import express from "express";

import Project from "../../DB/models/Project";
import authenticate from "../middlewares/authenticate";

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  Project.find({}, (err,projects) => {
    if(err) {
      res.status(400).json(err);
    }
    if(!projects) {
      res.status(404).json("Projects not found");
    } else {
      res.json(projects);
    }
  });
});

export default router;
