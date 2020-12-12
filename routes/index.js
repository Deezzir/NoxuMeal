const express = require('express');
const router = express.Router();

const mealModel = require("../models/Meals")
const Cart = require("../public/javascripts/cart")
const postMethods = require("../public/javascripts/postMethods")

//mealModel.insertMany(meals.getDB()).then(function(){
//    console.log("Data inserted")
//}).catch(function(error){
//    console.log(error)
//});

/* GET home page. */
router.get('/', async function(req, res, next) {
    let Meals = await mealModel.find({top: true}).lean();
    res.render('index/index',
        {title: "Main Page",
                file: "index.css",
                data: Meals,
                qty: postMethods.getQTY(req),
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
                title: "DashBoard",
                qty: postMethods.getQTY(req),
            });
    } else {
        return res.status(401).json({status: 'Please log in'})
    }
});

router.get('/sdash', function(req, res, next) {
    if(req.session.user && req.session.user.super_user) {
        res.render('index/sdash',
            {
                layout: 'main',
                file: "dash.css",
                qty: postMethods.getQTY(req),
                title: "DashBoard"
            });
    } else {
        return res.status(401).json({status: 'Please log in'});
    }
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('index/about',
      {title: "About Page",
              file: "about.css",
              layout: 'main',
              qty: postMethods.getQTY(req),
      });
});

/* GET menu page. */
router.get('/menu', async function(req, res, next) {
    let Meals = await mealModel.find({top: false}).lean();
    res.render('index/menu',
      {title: "Menu Page",
              file: "menu.css",
              data: Meals,
              layout: 'main',
              qty: postMethods.getQTY(req),
      });
});



router.get('/meal', async function(req, res, next) {
    let Meal = await mealModel.findOne({title: req.query.mealId}).lean()
    let In = Cart.inCart(req.query.mealId,(req.session.cart) ? req.session.cart : null);
    res.render('index/meal',
        {title: "Meal Page",
            file: "meal.css",
            layout: 'main',
            meal: Meal,
            In: In,
            qty: postMethods.getQTY(req),
        });
});

router.get('/meals', async function(req, res, next) {
    let Meals = await mealModel.find().lean();
    res.render('index/mealss',
        {title: "Manage",
            layout: 'main',
            file: "meals.css",
            data: Meals,
            qty: postMethods.getQTY(req),
        });
});

router.get('/Logout', function(req, res, next) {
    req.session.user = null;
    res.locals.user = null;
    req.session.destroy();
    res.redirect("/")
});


module.exports = router;
