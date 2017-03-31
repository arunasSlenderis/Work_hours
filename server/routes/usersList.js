import express from "express";

import User from "../../DB/models/User";
import authenticate from "../middlewares/authenticate";
import isAdmin from "../middlewares/isAdmin";
import validateInput from "../../shared/updateUserValidation";

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  User.find({}, (err, users) => {
    if(err) {
      res.json(err);
    }

    if(!users) {
      res.status(404).send();
    } else {
      res.status(200).json(users);
    }
  });
});

router.put("/updateUser", authenticate, (req, res) => {
  const { errors, isValid } = validateInput(req.body);

  if(isValid) {
    User.findOne({ _id: req.body.userId }, (err, user) => {
      if(err) {
        res.status(400).json(err);
      }
      if(!user) {
        res.status(404).send();
      } else {
        user.name = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.userType = req.body.checkedUser ? "user" : "admin";
        user.save(err => {
          if(err) {
            res.status(404).json(err);
          }
          res.json(user);
        });
      }
    });
  } else {
    res.status(400).json(errors);
  }

});

router.delete("/deleteUser", authenticate, (req, res) => {
  User.findOneAndRemove({ _id: req.body.userId }, err => {
    if(err) {
      res.json(err);
    } else {
      res.status(200).send();
    }
  });
});

router.put("/assignProjects", authenticate, (req, res) => {
  User.findOne({ _id: req.body.userId }, (err, user) => {
    if(err) {
      res.json(err);
    }
    if(!user) {
      res.status(404).send();
    } else {
      if(user.projects.length < 1) {
        user.projects = req.body.projects;
      } else {
        if(req.body.projects.length < user.projects.length) {
          user.projects.forEach(userProject => {
            let existingProject = req.body.projects.find(project => {
              return userProject._id == project._id;
            });

            if(!existingProject) {
              let index = user.projects.indexOf(userProject);
              user.projects.splice(index, 1);
            }
          });
        } else {
          req.body.projects.forEach(project => {
            let existingProject = user.projects.find(userProject => {
              return project._id == userProject._id;
            });

            if(!existingProject) {
              user.projects.push(project);
            }

          });
        }
      }
      user.save(err => {
        if(err) {
          res.json(err);
        } else {
          res.json(user);
        }
      });
    }
  });
});

export default router;
