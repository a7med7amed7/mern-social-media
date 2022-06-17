const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (authHeaders) {
    const token = authHeaders.split(" ")[1];
    if (token) {
      console.log(token);
      jwt.verify(token, "mySecretKey", (err, user) => {
        if (err) return res.status(403).json("Token is not valid!");
        else {
          req.user = user;
          console.log(user);
          next();
        }
      });
    }
  } else {
    res.status(401).json("You're not logged in!");
  }
};

const verifyRefreshToken = (req, res, next) => {
  const token = req.body.token;
  if (token === null) return res.status(404).json("Invalid token");
  try {
    const user = jwt.verify(token, "myRefreshSecretKey");
    req.user = user;
  } catch (err) {
    console.log(err);
  }
};

module.exports = verifyToken;
