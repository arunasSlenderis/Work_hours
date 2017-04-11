import express from "express";

const router = express.Router();

import Project from "../../DB/models/Project.js";
import User from "../../DB/models/User.js";
import authenticate from "../middlewares/authenticate";

router.delete("/", authenticate, (req, res) => {
  const { id } = req.body;
  if(!id) {
    res.status(400).json({ noProject: true, message: "Select project to delete" });
  } else {
    Project.findOneAndRemove({ _id: id }, (err, project) => {
      if(err) {
        res.status(400).json(err);
      }
      User.find({}, (err, users) => {
        if(err) {
          res.status(400).json(err);
        }
        users.forEach((user, index, array) => {
          const projectsToLeave = user.projects.filter(userProject => {
            return userProject.name !== project.name;
          });
          user.projects = projectsToLeave;
          user.save(err => {
            if(err) {
              res.status(400).json(err);
            }
          });
          if(index === array.length - 1) {
            res.json({ noProject: false, message: "Project deleted" });
          }
        });
      });
    });
  }
});

router.put("/", authenticate, (req, res) => {
  const { projectID, projectName, client, startDate } = req.body;
  const dueDate = startDate.substr(0, 10);

  Project.findOne({ _id: projectID }, (err, project) => {
    if(err) {
      res.status(400).json(err);
      return;
    }
    if(!project) {
      res.status(404).json({ message: "Project not found" });
    } else {
      project.name = projectName;
      project.client = client;
      project.dueDate = dueDate;

      User.find({}, (err, users) => {
        if(err) {
          res.status(400).json(err);
        }
        if(!users) {
          res.status(404).json({ message: "No users have been found" });
        } else {
          users.forEach((user, index, array) => {
            user.projects.forEach(project => {
              if(String(project._id) === projectID) {
                project.name = projectName;
                user.save();
              }
            });

            if(index === array.length - 1) {
              project.save(err => {
                if(err) {
                  res.status(400).json(err);
                } else {
                  res.json({ message: "Project has been updated" });
                }
              });
            }
          });
        }
      });


    }
  });
});

export default router;
