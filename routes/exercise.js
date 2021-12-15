const router = require('express').Router();
let Exercise = require('../models/exercise');

router.route('/').get((req,res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/add').post((req,res) => {
    const id = req.body.name
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const comment = req.body.comment;
    const profile = req.body.profile;

    const newExercise = new Exercise({id, name, email, mobile, comment, profile});

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: '+err));
});



router.route('/:id').delete((req,res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(exercise => res.json('Exercise deleted'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req,res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.name = req.body.name;
            exercise.email = req.body.email;
            exercise.mobile = req.body.mobile;
            exercise.comment = req.body.comment;
            exercise.profile = req.body.profile;

            exercise.save()
                .then(() => res.json('Exercise updated !'))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;