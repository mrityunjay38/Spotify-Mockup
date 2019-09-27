const express =  require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

let members = [
    {
        name : "MJ",
        email : '@gmail.com',
    },
    {
        name : "CJ",
        email : '@mail.com',
    },
    {
        name : "DJ",
        email : '@yahoo.com',
    }
];

app.get('/api/members', (req, res) => {
    return res.json(members);
});

app.post('/api/members', (req, res) => {
    const newMember = {
        name : req.body.name,
        email : req.body.email
    }
    members.push(newMember);
    res.json(members);
});

app.put('/api/members', (req, res) => {
    members[req.body.index].email = req.body.email
    res.json(members);
} );

app.delete('/api/members', (req, res) => {
    members.pop();
    res.json(members);
});



// Set static folder

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));