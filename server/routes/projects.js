import express from "express";

import Project from "../../DB/models/Project";
import User from "../../DB/models/User";
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

router.put("/", authenticate, (req, res) => {
  const projectID = req.body.id;
  let hours = 0;

  User.find({}, (err, users) => { //finds all users
    if(err) {
      res.status(400).json(err);
    }
    if(!users) {
      res.status(404).json({ message: "No user has been found" });
    } else {  //users found (happens all the time)
      users.forEach((user, index, array) => {
        const projectBeingChecked = user.projects.find(userProject => {
          return String(userProject._id) === projectID;
        });
        if(projectBeingChecked) {
          projectBeingChecked.time.forEach(hour => {
            hours += hour.hoursWorked;
          });
        }

        if(index === array.length - 1){
          Project.findOne({ _id: projectID }, (err, project) => {
            if(err) {
              res.status(400).json(err);
            }
            if(!project) {
              res.status(404).json({ message: "no projects have been found" });
            } else {
              project.hoursWorked = hours;
              project.save(err => {
                if(err) {
                  res.status(400).json(err);
                } else {
                  res.json(hours);
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

/*Messy not working correctly*/

// const allProjects = [];
// const userProjects = [];
// const uniqueProjects = [];
// const semiUniq = [];
// const hours = [];
// let projectFromDB;
// Project.find({}, (err, projects) => {
//   if(err) {
//     res.status(400).json(err);
//   }
//   if(!projects) {
//     res.status(404).json({ message: "No projects has been found" });
//   } else {
//     projects.forEach((project, index, array) => {
//       allProjects.push(project._id);    //putting all database project ids to array
//       if(index === array.length - 1) {
//         User.find({}, (err, users) => {
//           if(err) {
//             res.status(400).json(err);
//           }
//           if(!users) {
//             res.status(404).json({ message: "No users has been found" });
//           } else {
//             users.forEach((user, index, array) => {
//               user.projects.forEach(project => {
//                 allProjects.forEach(dbProjectID => {
//                   if(String(dbProjectID) === String(project._id)) {
//                     if(project.time.length > 0) {
//                       project.time.forEach((item, index, array) => {
//                         hours.push(item.hoursWorked);
//                         if(index === array.length - 1) {
//                           console.log(hours);
//                           userProjects.push({
//                             id: dbProjectID,
//                             hours: hours.reduce((acc, hour) => acc + hour, 0)
//                           }); //adding matched user and db projects ids to another array with worked time
//                         }
//                       });
//                     } else {
//                       userProjects.push({
//                         id: dbProjectID,
//                         hours: 0
//                       });
//                     }
//
//                   }
//                 });
//               });
//               if(index === array.length - 1) {
//                 allProjects.forEach((projectID, index, array) => {
//                   semiUniq.push(userProjects.filter(userProject => {
//                     return String(projectID) === String(userProject.id);
//                   }));
//                   if(index === array.length - 1) {
//                     semiUniq.forEach((semi, index, array) => {
//                       if(semi.length > 0) {
//                         uniqueProjects.push({
//                           id: semi[0].id,
//                           hours: semi.reduce((acc, item) => acc += item.hours, 0) //calculating worked time and adding to yet another array also with uniq project id
//                         });
//                       }
//                       if(index === array.length - 1) {
//                         uniqueProjects.forEach((project, index, array) => {
//                           projectFromDB = projects.find(dbProject => {
//                             return project.id === dbProject._id;
//                           });
//                           projectFromDB.hoursWorked = project.hours;
//                           projectFromDB.save(err => {
//                             if(err) {
//                               res.status(400).json(err);
//                             } else {
//                               res.status(200).send();
//                             }
//                           });
//                         });
//                       }
//                     });
//                   }
//                 });
//               }
//             });
//           }
//         });
//       }
//     });
//   }
// });
