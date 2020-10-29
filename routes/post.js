const express = require('express');
const router = express.Router();

const validation = require('../public/javascripts/validation')
const meals = require('../public/javascripts/meals')

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

function send(message, res) {
    const msg = {
        to: message.email,
        from: process.env.EMAIL,
        subject: 'Registration Submission',
        html:
            `Thank you for registration <br> 
                ${message.lname} ${message.fname}<br>
                ${message.email}<br>`
    };

    sgMail.send(msg)
        .then(() => {
            res.redirect("/");
        })
        .catch(err => {
            console.log(`Error ${err}`);

            res.render("index/index", {
                title: "Main Page",
                file: "index.css",
                data: meals.getDB(),
                layout: 'main',
            });
        });
}

router.post("/", (req, res) => {
    console.log(req.body)
    if (req.body.action === "login") {
        var {passed, message, action} = validation.checkLogin(req.body)
    } else if (req.body.action === "register") {
        var {passed, message, action} = validation.checkRegister(req.body)
    }

    console.log(passed, action)

    if (passed && action === 'login') {
        res.render("index/index", {
            title: "Main Page",
            file: "index.css",
            data: meals.getDB(),
            layout: 'main'
        });
    } else if (passed && action === 'register') {
        send(message, res);
    } else {
        res.render("index/index", {
            title: "Main Page",
            file: "index.css",
            data: meals.getDB(),
            kak: action,
            layout: 'main',
            message: message,
            values: req.body
        });
    }
});

router.post("/about", (req, res) => {
    console.log(req.body)
    if (req.body.action === "login") {
        var {passed, message, action} = validation.checkLogin(req.body)
    } else if (req.body.action === "register") {
        var {passed, message, action} = validation.checkRegister(req.body)
    }
    if (passed && action === 'login') {
        res.render("index/about", {
            title: "About Page",
            file: "about.css",
            data: meals.getDB(),
            layout: 'main'
        });
    } else if (passed && action === 'register') {
        send(message, res);
    } else {
        res.render("index/about", {
            title: "About Page",
            file: "about.css",
            data: meals.getDB(),
            kak: action,
            layout: 'main',
            message: message,
            values: req.body
        });
    }

});

router.post("/menu", (req, res) => {
    console.log(req.body)
    if (req.body.action === "login") {
        var {passed, message, action} = validation.checkLogin(req.body)
    } else if (req.body.action === "register") {
        var {passed, message, action} = validation.checkRegister(req.body)
    }


    console.log(message)
    if ((passed && action === 'login')) {
        res.render("index/menu", {
            title: "Menu Page",
            file: "menu.css",
            data: meals.getDB(),
            layout: 'main'
        });
    } else if (passed && action === 'register') {
        send(message, res);
    } else {
        res.render("index/menu", {
            title: "Menu Page",
            file: "menu.css",
            data: meals.getDB(),
            kak: action,
            layout: 'main',
            message: message,
            values: req.body
        });
    }
});


module.exports = router;