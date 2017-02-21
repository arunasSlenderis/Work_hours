import express from "express";

import Project from "../../DB/models/Project";
import User from "../../DB/models/User";
import authenticate from "../middlewares/authenticate";

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  Project.find({}, (err, projects) => {
    if(err) {
      res.json(err);
    }

    if(!projects) {
      res.status(404).send();
    } else {
      res.status(200).json(projects);
    }
  });
});

router.put("/updateWorkTime", authenticate, (req, res) => {
  User.findById(req.body.userID, (err, user) => {
    if(err) {
      res.json(err);
    } else {
      const project = user.projects.find(project => {
        return project.id === req.body.projectID;
      });
      if(typeof project === "undefined") {
        console.error("No such project");
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
        } else {
          const dateIndex = user.projects[projectIndex].time.indexOf(date);
          user.projects[projectIndex].time[dateIndex].hoursWorked += hoursWorked;

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
    }
  });
});

export default router;
