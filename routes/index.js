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

router.get('/dash', function(req, res, next) {
    if(req.session.user) {
        res.render('index/dash',
            {
                userID: req.session.user._id,
                layout: 'main',
                file: "dash.css",
                title: "DashBoard"
            });
    } else {
        res.sendStatus(404);
    }
});

router.get('/sdash', function(req, res, next) {
    if(req.session.user && req.session.user.super_user) {
        res.render('index/sdash',
            {
                layout: 'main',
                file: "dash.css",
                title: "DashBoard"
            });
    }else {
        res.sendStatus(404);
    }
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

router.get('/Logout', function(req, res, next) {
    req.session.destroy();
    res.redirect("/")
});


module.exports = router;
