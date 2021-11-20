const {Router} = require('express');
const router = Router();
const Catalog = require('../models/catalog');


router.get('/', ((req, res) => {
    res.status(200);
    res.render('add', {title: 'Добавить', isAdd: true});
}));

router.post('/', ( async (req, res) => {
    console.log(req.body)
    const catalog = new Catalog(req.body.title, req.body.description, req.body.price, req.body.img);
    await catalog.save();
    res.status(200);
    res.redirect('/catalog');
}));

module.exports = router;
