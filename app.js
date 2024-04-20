const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine',  'ejs');
app.set('views', path.join(__dirname, 'views'));

//fake data
let comments = [
    {
        id: 1,
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: 2,
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: 3,
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: 4,
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

app.get('/', (req, res) => {
    res.render(`index`, {comments})
});

app.get('/show/:id', (req,res)=>{
    const {id} = req.params;
     const comment = comments.find((c)=>{
        return (c.id === parseInt(id));
    })//find object by id and put it in a variable
    console.log(comment); //debugging purposes
    res.render('show', {comment})
});
app.get('/new', (req,res)=>{
    res.render('new');
})
app.post('/new/comment', (req, res)=>{
    const {comment, username} = req.body;
    //console.log(maxId());
    comments.push({username, comment, id: maxId() + 1});
    console.log(comments); //debugging purposes
    res.redirect('/');
})

app.get('edit/:id', (req, res)=>{
    const {id} = req.params;
    const comment = comments.find(c=> c.id === id);
})
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})


function maxId(){
    let max = comments[0].id;
    for (let i=0; i<comments.length;i++){
        if (max <  comments[i].id){
            max = comments[i].id;
        }
}
return max;
}