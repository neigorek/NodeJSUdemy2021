const {Router} = require('express');
const router = Router();
const Catalog = require('../models/catalog');
router.get('/', ( async (req, res) => {
    const catalog = await Catalog.getAll();
    res.status(200);
    res.render('catalog', {title: 'Каталог', isCatalog: true, catalog});
}));

router.get('/:id/edit', (async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }
    const item = await Catalog.getById(req.params.id);
    res.render('item-edit', {
        title: `Edit ${item.title}`,
        item
    })
}));

router.post('/:id/edit', (async (req, res) => {
    await Catalog.update(req.body);
    res.redirect('/catalog');
}));

router.get('/:id', (async (req, res) => {
    const item = await Catalog.getById(req.params.id);
    res.status(200);
    res.render('item', {title: `Предмет${item.title}`, item});
}));

module.exports = router;
