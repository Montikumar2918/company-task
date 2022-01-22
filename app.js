const express = require('express');
require("dotenv").config();




const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express()
const cors=require('cors');
app.use(cors());

const PORT = process.env.PORT || "3002";

app.use(bodyParser.urlencoded({ extended: false }));
//mongodb+srv://Monti:Monti123@cluster0.s8bd8.mongodb.net/task?retryWrites=true&w=majority
//mongodb://localhost:27017/task
mongoose
  .connect(
        'mongodb+srv://Monti:Monti123@cluster0.s8bd8.mongodb.net/task?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true

        }
    )
  .then(result => {
    app.listen(process.env.PORT ,()=>{
        console.log(`Server started successfully at ${process.env.PORT}`);
    })
  })
  .catch(err => {
    console.log(err);
  });


  require('./Models/user')
  require('./Models/product')
  require('./Models/business')
 
  const requireLogin = require("./Middleware/requireLogin");

  app.use(express.json())
  app.use(require('./Routes/auth'))
  app.use(require('./Routes/product'))
  app.use(require('./Routes/business'))
 
  app.get('/',requireLogin,(req,res)=>{
    res.send({email:req.user.email})
})