const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  bio:{
    type: String,
    required: true
  },
  profilePic:{
    type: String,
    required: true
  },
});

mongoose.model("User",userSchema);