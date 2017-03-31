import express from "express";

const router = express.Router();

import Project from "../../DB/models/Project.js";
import authenticate from "../middlewares/authenticate";
import validateInput from "../../shared/addProjectValidation";

router.post("/", authenticate, (req, res) => {
  const { errors, isValid } = validateInput(req.body);
  if(isValid) {
    const dueDate = req.body.startDate.substr(0, 10);
    const { name, client } = req.body;

    Project.findOne({ name }, (err, project) => {
      if(err) {
        res.json(err);
      }
      if(project) {
        res.status(400).json({
          success: false,
          fail: true,
          text: "Project with such name already exists"
        });
      } else {
        const newProject = new Project();

        newProject.name = name;
        newProject.client = client;
        newProject.dueDate = dueDate;

        newProject.save(err => {
          if(err) {
            res.status(400).json(err);
          } else {
            res.json({
              success: true,
              fail: false,
              text: "Project added successfully"
            });
          }
        });
      }
    });
  } else {
    res.status(400).json(errors);
  }
});

export default router;
