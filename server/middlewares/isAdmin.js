import User from "../../DB/models/User";

export default function isAdmin(req, res, next) {
  User.findOne({ _id: req.body.userID }, (err, user) => {
    if(err) {
      res.status(400).json(err);
    }
    if(user) {
      if(user.userType === "admin") {
        next();
      } else {
        res.status(404).json({ message: "You need to be an admin to access" });
      }
    }
  });
}
