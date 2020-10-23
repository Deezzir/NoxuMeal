const express = require('express');
const router = express.Router();

const meals = require('../public/javascripts/meals')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/index',
      {title: "Main Page",
              file: "index.css",
              data: meals.getDB(),
              layout: 'main'
      });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('index/about',
      {title: "About Page",
              file: "about.css",
              layout: 'main'
      });
});

/* GET menu page. */
router.get('/menu', function(req, res, next) {
  res.render('index/menu',
      {title: "Menu Page",
              file: "menu.css",
              data: meals.getDB(),
              layout: 'main'
      });
});

module.exports = router;
