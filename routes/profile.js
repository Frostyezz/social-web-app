const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('../models/post');
const Account = require('../models/account');
const session = require('express-session');
const methodOverride = require('method-override');

router.get('/:username', async (req, res) =>{
    const { username } = req.params;
    const result = await Account.findOne({username: username});
    const posts = await Post.find({author: username});
    res.render('profile', {user:req.session, result, posts});
})

router.get('/:username/edit', async (req, res) => {
    const { username } = req.params;
    const result = await Account.find({username});
    res.render('editProfile', {user:req.session});
})

router.put('/:username/edit', async (req, res) => {
    const { username } = req.params;
    req.session.profileURL = req.body.profileIMG;
    req.session.bio = req.body.bio;
    await Account.findOneAndUpdate({username: username}, {profileIMG: req.body.profileIMG, bio: req.body.bio});
    res.redirect(`/profile/${username}`);
})

router.delete('/:username/delete_profile', async (req,res) => {
    const { username } = req.params;
    await Post.remove({author: username});
    await Account.findOneAndDelete({username: username});
    req.session.username = '';
    req.session.isLogged = false;
    res.redirect('/');
})

module.exports = router;