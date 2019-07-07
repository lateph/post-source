const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        console.log("error")
        return {
          errors: {
            'email': "Email Already Exists",
            'password': ""
          },
        }
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const userNew = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await userNew.save();

      let user =  { ...result._doc, password: null, _id: result.id };
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        'somesupersecretkey',
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
  }
};
