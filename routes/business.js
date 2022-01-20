const router = require('express').Router();
let Business = require('../models/business');

router.get('/Business',(req,res) => {
    Business.find()
        .then(businesses => res.json(businesses))
        .catch(err => res.status(400).json('Error: ' +err));
});

router.post('/addBusiness',(req,res) => {
    const id = req.body.id
    const name = req.body.name;
    const email = req.body.email;
    const registrationNo = req.body.registrationNo;
    

    const newBusiness = new Business({id, name, email, registrationNo});

    newBusiness.save()
        .then(() => res.json('Business added!'))
        .catch(err => res.status(400).json('Error: '+err));
});



module.exports = router;