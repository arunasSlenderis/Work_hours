import express from "express";

import Project from "../../DB/models/Project";
import User from "../../DB/models/User";
import authenticate from "../middlewares/authenticate";

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  User.findOne({ _id: req.query.id }, (err, user) => {
    if(err) {
      res.status(400).json(err);
    }
    if(user) {
      if(user.projects.length > 0) {

        const assignedProjects = [];

        user.projects.forEach((userProject, index, array) => {
          Project.findOne({_id: userProject._id}, (err, project) => {
            if(err) {
              res.status(400).json(err);
            }
            // if(project) {
            assignedProjects.push(project);

            if(index === array.length - 1) {
              res.json(assignedProjects);
            }
            // }
          });
        });
      } else {
        res.status(404).json({ message: "No projects assigned" });
      }
    }
  });
});

router.put("/updateWorkTime", authenticate, (req, res) => {
  User.findOne({_id: req.body.userID}, (err, user) => {
    if(err) {
      res.json(err);
    } else {
      const project = user.projects.find(project => {
        return project._id == req.body.projectID;
      });
      if(typeof project === "undefined") {
        res.status(404).json({ message: "This project is not assigned" });
      } else {
        const workDate = req.body.workTime.date.substr(0, 10);
        const hoursWorked = req.body.workTime.hours;
        const date = project.time.find(time => time.date === workDate);
        const projectIndex = user.projects.indexOf(project);

        if(typeof date === "undefined") {
          user.projects[projectIndex].time.push({
            date: workDate,
            hoursWorked
          });
        } else {
          const dateIndex = user.projects[projectIndex].time.indexOf(date);
          user.projects[projectIndex].time[dateIndex].hoursWorked += hoursWorked;
        }

        Project.findById(req.body.projectID, (err, project) => {
          if(err) {
            res.json(err);
          } else {
            project.hoursWorked = user.projects[projectIndex].time.reduce(
              (acc, time) => {
                return acc + time.hoursWorked;
              }, 0
            );

            project.save();
          }
        });

        user.save((err) => {
          if(err) {
            res.json(err);
          } else {
            res.json(user.projects[projectIndex].time);
          }
        });
      }
    }
  });
});

export default router;
