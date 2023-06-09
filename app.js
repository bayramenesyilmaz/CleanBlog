const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();

const ejs = require('ejs');

const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect DB
mongoose
  .connect(
    `mongodb+srv://bayenes:jbe18Wa4TFVLU7jm@cluster0.0ko7v2s.mongodb.net/?retryWrites=true&w=majority`
  )
  .then((res) => console.log('Connected mongo atlas'))
  .catch((err) => console.log(err));

/* MIDDLEWARE */
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(
  methodOverride('_method', {
    methods: ['GET', 'POST'],
  })
);

/* ROUTES */
app.get('/', postController.getAllPost);
app.get('/post/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/edit-post/:id', pageController.getEditPostPage);
app.get('/about', pageController.getAboutPage);
app.get('/add-post', pageController.getAddPostPage);

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} nolu portta çalışıyor...`);
});
