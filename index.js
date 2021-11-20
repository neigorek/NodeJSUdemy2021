const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const catalogRoutes = require('./routes/catalog');
const addRoutes = require('./routes/add');
const aboutRoutes = require('./routes/about');
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//routes
app.use(homeRoutes);
app.use('/catalog', catalogRoutes);
app.use('/add', addRoutes);
app.use('/about', aboutRoutes);


const PORT = process.env.PORT || 3000;
app.listen('3000', () => {
    console.log(`Server run in port ${PORT}`);
});
