const mongoose = require ('mongoose');
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const Photo = require ('./modules/Photo');


const app = express();

mongoose.connect('mongodb://127.0.0.1/my_database');

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json());

//ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({})
  res.render('index', {
    photos
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');  
});

app.post('/photos', async (req, res) => {
 await Photo.create(req.body);
  res.redirect('/');
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server port ${port}'de başlatıldı.`);
});
