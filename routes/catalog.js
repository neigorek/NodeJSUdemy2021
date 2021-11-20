const {Router} = require('express');
const router = Router();
const Catalog = require('../models/catalog');
router.get('/', ( async (req, res) => {
    const catalog = await Catalog.getAll();
    console.log(catalog);
    res.status(200);
    res.render('catalog', {title: 'Каталог', isCatalog: true, catalog});
}));

module.exports = router;
