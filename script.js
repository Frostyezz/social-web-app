if(process.env.NODE_ENV !== 'production') 
{
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const rootRoutes = require('./routes/root');
const profileRoutes = require('./routes/profile');
const postRoutes = require('./routes/postRoute');
const Account = require('./models/account');
const Post = require('./models/post');
const session = require('express-session');
const sessionOptions = {secret: process.env.SECRET, resave: false, saveUninitialized: false};
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(session(sessionOptions));
app.use(methodOverride('_method'));

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/socialApp';

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then (() =>{
    console.log("connected to mongo");
})
.catch(err =>{
    console.log(err);
})

const port = process.env.PORT || 3000;
app.listen(port, () =>{})

app.get('/', async (req,res) => {
    if(!req.session.isLogged)
        req.session.isLogged = false
    const posts = await Post.find()
    res.render('home', {user: req.session, posts});
})

app.use('/', rootRoutes);

app.use('/profile', profileRoutes);

app.use('/post', postRoutes);



