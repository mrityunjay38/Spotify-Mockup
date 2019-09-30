const express =  require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const app = express();  


// Handlebars

app.engine('handlebars', exphbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

// Express in-built body parser

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Router functions

const allTracks = require('./routes/api');
const users = require('./routes/users');


app.use('/', allTracks);
app.use('/user', users);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));