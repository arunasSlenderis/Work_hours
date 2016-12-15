const getAllUsers = (app, User) => {
  app.get("/getAllUsers", (req, res) => {
    User.find({}, (err, users) => {
      if(err) res.status(500).json(err);

      res.json(users);
    });
  });
};

export default getAllUsers;
