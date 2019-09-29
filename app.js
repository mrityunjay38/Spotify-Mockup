const express =  require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();  


// Handlebars

app.engine('handlebars', exphbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

// Express in-built body parser

app.use(express.json());
app.use(express.urlencoded({extended:false}));


// Router functions

const index = require('./routes/api');

app.use('/', index);

// Set static folder

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));