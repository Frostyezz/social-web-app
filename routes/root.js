const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('../models/post');
const Account = require('../models/account');
const session = require('express-session');
const methodOverride = require('method-override');

router.post('/create_post', (req,res) =>{
    const postt = new Post({
        author: req.session.username,
        title: req.body.title,
        description: req.body.description,
        imgURL: req.body.imgURL,
        boosts: 0,
        boosters: [],
        creationDate: Date.now()
    });
    postt.save();
    res.redirect('/');
})

router.post('/sign_up', (req,res) =>{
    const acc = new Account({
        email: req.body.email, 
        username: req.body.username, 
        password: req.body.password, 
        since: Date.now(),
        profileIMG: 'http://www.smafta.ro/images/data/no-user-image.jpg',
        bio:''
    });
    acc.save();
    req.session.username = req.body.username;
    req.session.isLogged = true;
    console.log(`${req.session.username} logged in`);
    res.redirect('/');
})

router.post('/log_in', (req,res) =>{
    const result = Account.find({username: req.body.username, password: req.body.password})
    .then(data => {
        if(data != '')
        {
            req.session.username = req.body.username;
            req.session.isLogged = true;
            console.log(`${req.session.username} logged in`);
            res.redirect('/');
        }
        else res.redirect('/log_in');
    })
})

router.get('/create_post', (req,res) =>{
    res.render('createPost',{ user: req.session });
})

router.get('/log_out', (req,res) =>{
    console.log(`${req.session.username} logged out`);
    req.session.username = '';
    req.session.isLogged = false;
    res.redirect('/');
})

router.get('/sign_up', (req,res) => {
    res.render('sign_up',{user: req.session});
})

router.get('/log_in', (req,res) => {
    res.render('log_in',{user: req.session});
})

module.exports = router;