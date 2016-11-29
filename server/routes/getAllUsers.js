const getAllUsers = (app, errors, User) => {
  app.get("/getAllUsers", (req, res) => {
    errors = [];
    User.find({}, (err, users) => {
      if(err) {
        errors["serverError"] = "Error finding all users";
        console.log(`Error finding all users. ${err}`);
        res.status(500).send(errors);
      }
      res.json(users);
    });
  });
};

export default getAllUsers;
