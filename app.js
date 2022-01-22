
const express = require('express')
const PORT = 3002

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express()
const cors=require('cors');
app.use(cors());

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
    app.listen(PORT,()=>{
        console.log("server is running on ",PORT)
    })
  })
  .catch(err => {
    console.log(err);
  });


  require('./models/user')
  require('./models/product')
  require('./models/business')
 
  const requireLogin = require("./middleware/requireLogin");

  app.use(express.json())
  app.use(require('./routes/auth'))
  app.use(require('./routes/product'))
  app.use(require('./routes/business'))
 
  app.get('/',requireLogin,(req,res)=>{
    res.send({email:req.user.email})
})