const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config({path:"config/keys.env"});

const postMethods = require('../public/javascripts/postMethods')

router.post("/", (req, res) => {
    const params = {
        view: "index/index",
        title: "Main Page",
        file: "index.css"
    };
    postMethods.postInfo(res, req, params);
});

router.post("/about", (req, res) => {
    const params = {
        view: "index/about",
        title: "About Page",
        file: "about.css"
    };
    postMethods.postInfo(res, req, params);

});

router.post("/menu", (req, res) => {
    const params = {
        view: "index/menu",
        title: "Menu Page",
        file: "menu.css"
    };
    postMethods.postInfo(res, req, params);
});

router.post("/meals", (req, res) => {
    const params = {
        view: "index/mealss",
        title: "Meals",
        file: "meals.css",
    };
    postMethods.postInfo(res, req, params);
});

router.post("/update", (req, res) => {
    const params = {
        view: "index/mealss",
        title: "Meals",
        file: "meals.css",
    };
    req.body.action = "updateMeal"
    postMethods.postInfo(res, req, params);
});

router.post("/delete", (req, res) => {
    const params = {
        view: "index/mealss",
        title: "Meals",
        file: "meals.css",
    };
    req.body.action = "deleteMeal"
    postMethods.postInfo(res, req, params);
});


module.exports = router;