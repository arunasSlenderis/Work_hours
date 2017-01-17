import express from "express";

import Project from "../../DB/models/Project";
import authenticate from "../middlewares/authenticate";

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  Project.find({}, (err, projects) => {
    if(err) {
      res.json(err);
    } else {
      res.status(200).json(projects);
    }
  });
});

export default router;
