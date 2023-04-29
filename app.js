const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

/* MIDDLEWARE */
app.use(express.static('public'));
app.set('view engine', 'ejs');

/* ROUTES */
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/post', (req, res) => {
  res.render('post');
});
app.get('/add-post', (req, res) => {
  res.render('add_post');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} nolu portta çalışıyor...`);
});
