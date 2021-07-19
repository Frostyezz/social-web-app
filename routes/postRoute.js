const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('../models/post');
const Account = require('../models/account');
const session = require('express-session');
const methodOverride = require('method-override');

router.get('/:id/boost', async (req,res) => {
    const { id } = req.params;
    const post = await Post.findOne({_id: id});
    post.boosters.push(req.session.username);
    post.boosts += 1;
    await post.save();
    res.redirect('/');
})

router.get('/:id/unboost', async (req,res) => {
    const { id } = req.params;
    const post = await Post.findOne({_id: id});
    for(let i = 0; i < post.boosters.length; i++)
        if(post.boosters[i] === req.session.username)
            {
                post.boosters.splice(i,1);
                break;
            }
    post.boosts -= 1;
    await post.save();
    res.redirect('/');
})

router.get('/:id/edit', async (req,res) => {
    const { id } = req.params;
    const post = await Post.findOne({_id: id});
    console.log(post);
    res.render('editPost', {user: req.session, post });
})

router.put('/:id/edit', async (req,res) => {
    const { id } = req.params;
    await Post.findByIdAndUpdate(id, {imgURL: req.body.imgURL, title: req.body.title, description: req.body.description});
    res.redirect('/');
})

router.delete('/:id/delete_post', async (req,res) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.redirect('/');
})

module.exports = router;