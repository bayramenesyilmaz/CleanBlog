const express = require('express');
const mongoose = require('mongoose');

const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect DB
mongoose.connect('mongodb://localhost/clean-blog');

/* MIDDLEWARE */
app.use(express.static('public'));
app.set('view engine', 'ejs');

/* ROUTES */
app.get('/', async (req, res) => {
  const posts = await Post.find();
  res.render('index', { posts });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', { post });
});
app.get('/add-post', (req, res) => {
  res.render('add_post');
});

app.post('/posts', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} nolu portta çalışıyor...`);
});
