const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate = require("validate.js");

const User = require('../../models/user');
const { transformUser } = require('./merge');

module.exports = {
  createUser: async args => {
    try {
      validate.validators.checkEmail = function(value) {
        return new validate.Promise(function(resolve, reject){
          const query = User.findOne({ email: value });
          query.exec(function (err, person) {
            if (err) return resolve("Email Already Exists");
            // Prints "Space Ghost is a talk show host."
            if (person) {
              resolve("Email Already Exists")
            }
            else{
              resolve()
            }
          });
          
        });
      };

      const constraints = {
        firstName: {
          presence: {allowEmpty: false},
        },
        lastName: {
          presence: {allowEmpty: false},
        },
        email: {
          presence: {allowEmpty: false},
          email: true,
          checkEmail: true
        },
        password: {
          presence: {allowEmpty: false},
        }
      };
      // return
      await validate.async({
        firstName: args.userInput.firstName,
        lastName: args.userInput.lastName,
        email: args.userInput.email,
        password: args.userInput.password,
      }, constraints);
    } catch (errors) {
      console.log(errors);
      return {
        errors,
      }
    }
    try {
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const userNew = new User({
        email: args.userInput.email,
        firstName: args.userInput.firstName,
        lastName: args.userInput.lastName,
        password: hashedPassword
      });

      const result = await userNew.save();

      let user =  { ...result._doc, password: null, _id: result.id };
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        'supergantengbanget',
        {
          expiresIn: '1y'
        }
      );
      let auth = { userId: user._id, token: token, tokenExpiration: 365*24 };
      console.log(auth)
      return {
        user,
        auth: auth 
      }
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    // return {"userId":"5d0eec4a3558af193c763683","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDBlZWM0YTM1NThhZjE5M2M3NjM2ODMiLCJlbWFpbCI6ImxhdGVwaEBnbWFpbC5jb20iLCJpYXQiOjE1NjEzMjY3MzQsImV4cCI6MTU2MTMzMDMzNH0.3x1mHyuhUuZkwoHJDXcdl_RQX_tPzFE-SepY-ZJrsfo","tokenExpiration":1};

    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'supergantengbanget',
      {
        expiresIn: '1y'
      }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },
  users: async (args) => {
    try {
      const users = await User.find(args.filter).skip(args.pagination.skip).limit(args.pagination.limit).exec();
      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  countUsers: async (args) => {
    try {
      return User.count(args.filter)
    } catch (err) {
      throw err;
    }
  },
  user: async (args, req) => {
    try {
      const user = await User.findOne({_id:args._id});
      
      return transformUser(user);
    } catch (err) {
      throw err;
    }
  },
  updateUser: async args => {
    try {
      const constraints = {
        firstName: {
          presence: {allowEmpty: false},
        },
        lastName: {
          presence: {allowEmpty: false},
        },
        // password: {
        //   presence: {allowEmpty: false},
        // }
      };
      // return
      await validate.async({
        firstName: args.userInput.firstName,
        lastName: args.userInput.lastName,
        // email: args.userInput.email,
        // password: args.userInput.password,
      }, constraints);
    } catch (errors) {
      console.log(errors);
      return {
        errors,
      }
    }
    try {

      const user = await User.findByIdAndUpdate(_id, {
        firstName: args.userInput.firstName,
        lastName: args.userInput.lastName,
      });
      if (!user) {
          throw new Error('Bank not found')
      }
      return {
        user: await User.findById(_id),
      }
    } catch (err) {
      throw err;
    }
  },
};
