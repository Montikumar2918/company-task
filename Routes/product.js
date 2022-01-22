const router = require('express').Router();
let Product = require('../Models/product');

router.get('/',(req,res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' +err));
});

router.post('/addProduct',(req,res) => {
    const id = req.body.id
    const name = req.body.name;
    const mrp = req.body.mrp;
    const description = req.body.description;
    const image = req.body.image;
    

    const newProduct = new Product({id, name, mrp, description, image});

    newProduct.save()
        .then(() => res.json('Product added!'))
        .catch(err => res.status(400).json('Error: '+err));
});



router.delete('/:id',(req,res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(product => res.json('Product deleted'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.post('/update/:id',(req,res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.name = req.body.name;
            product.mrp = req.body.mrp;
            product.description = req.body.description;
            product.immage = req.body.image;
            

            product.save()
                .then(() => res.json('Product updated !'))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;