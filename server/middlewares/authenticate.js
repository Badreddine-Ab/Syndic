const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken')
const app = express();

app.use(cookieParser());

const authorization = (req, res, next) => {
    
    const token = req.cookies.access_token;
   
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = data.id;
      return next();
    } catch(error) {
        console.log(error)
      return res.sendStatus(403);
    }
  };

  module.exports = {
    authorization
  }