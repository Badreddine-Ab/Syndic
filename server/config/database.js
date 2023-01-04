const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs');

const dbConnection = () => {
    mongoose.connect(process.env.DB_URI).then((conn)=> {
        console.log('Database Connected :' +conn.connection.host)
    })
    .catch((err)=> {
        console.error(`Database Error : ${err}`);
        process.exit(1)
    })
}

// Check if the user already exists
User.findOne({ email: 'syndic@gmail.com' }, (error, user) => {
    if (error) {
      console.log(error);
    } else if (user) {
      console.log('User already exists!');
    } else {
      // Hash the password with bcrypt
      bcrypt.hash('syndic123', 10, (error, hashedPassword) => {
        if (error) {
          console.log(error);
        } else {
          // Create a new user with the hashed password
          const newUser = new User({
            email: 'syndic@gmail.com',
            password: hashedPassword
          });
          newUser.save((error) => {
            if (error) {
              console.log(error);
            } else {
              console.log('User created successfully!');
            }
            mongoose.connection.close();
          });
        }
      });
    }
  });

module.exports = dbConnection