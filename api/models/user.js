const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }
  ]
});

userSchema.pre('findOneAndUpdate', async function(next, a ,b) {
  try {
    if(this._update.$set.password){
      this._update.$set.password = await bcrypt.hash(this._update.$set.password, 12);
    }
  } catch (error) {
    
  }
  next();
});

userSchema.pre('save', async function(next, a ,b) {
  // console.log("jancokxxxx", this)
  if(this.password){
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

module.exports = mongoose.model('users', userSchema);
