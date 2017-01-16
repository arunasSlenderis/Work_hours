import jwt from "jsonwebtoken";

import config from "../config/jwtConfig";

export default function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  let token;

  if(authHeader) token = authHeader.split(" ")[1];  //takes token after word Bearer

  if(token) {
    jwt.verify(token, config.jwtSecret, err => {
      if(err) {
        res.status(401).json({ error: "Failed to authenticate" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).json({
      error: "No token provided"
    });
  }
}
