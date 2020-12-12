const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const path = require("path");

const bcrypt = require('bcrypt')
const userModel = require("../../models/Users")
const Cart = require("./cart")
const validation = require('./validation')

const mealModel = require('../../models/Meals')

const postMethods = {
    send(res, req) {
        const msg = {
            to: req.body.email,
            from: process.env.EMAIL,
            subject: 'Registration Submission',
            html:
                `Thank you for registration <br> 
                        ${req.body.lname} ${req.body.fname}<br>
                        ${req.body.email}<br>`
        };

        sgMail.send(msg)
            .then(() => {
                res.redirect("/dash");
            })
            .catch(async function(error){
                console.log(`Error ${error}`);
                let Meals = await mealModel.find().lean();
                res.render("index/index", {
                    title: "Main Page",
                    file: "index.css",
                    data: Meals,
                    layout: 'main',
                });
            });
    },

    checkout(res, req) {
        let cart = (req.session.cart) ? req.session.cart : null;
        let orders = ""

        cart.items.forEach((item) => {
            orders += `Meal: ${item.title}, QTY: ${item.qty}, Price: ${item.price}$<br>`
        })

        const msg = {
            to: req.session.user.email,
            from: process.env.EMAIL,
            subject: 'Order Checkout',
            html:
                `Thank you for your Order <br> 
                        ${orders}
                        Total: ${cart.totals}$<br>`
        };

        sgMail.send(msg)
            .then(() => {
                console.log("here")
                Cart.emptyCart(req)
                res.redirect("/");
            })
            .catch(async function(error){
                console.log(`Error ${error}`);
                let Meals = await mealModel.find().lean();
                res.render("index/index", {
                    title: "Main Page",
                    file: "index.css",
                    data: Meals,
                    layout: 'main',
                });
            });
    },

    async renderError(res, req, params) {
        let Meals = await mealModel.find().lean();
        let Meal = await mealModel.findOne({title: req.query.mealId}).lean()
        let In = Cart.inCart(req.query.mealId,(req.session.cart) ? req.session.cart : null);
        res.render(params.view, {
            title: params.title,
            file: params.file,
            data: Meals,
            meal: Meal,
            In : In,
            kak: params.action,
            layout: 'main',
            message: params.message,
            values: req.body
        });
    },

    addToCart(req, res) {
        mealModel.findOne({title: req.query.mealId}).then(prod => {
            let cart = (req.session.cart) ? req.session.cart : null;
            if(cart) {
                Cart.addToCart(prod, 1, cart);
            }
            res.redirect(`/meal?mealId=${req.query.mealId}`)
        }).catch(err => {
            console.log(err)
        });
    },

    clearCart(req, res, link) {
        Cart.emptyCart(req);
        res.redirect(`/${link}`);
    },

    removeFromCart(req, res, link) {
        Cart.removeFromCart(req.query.mealId, (req.session.cart) ? req.session.cart : null)
        res.redirect(`/${link}`)
    },

    updateCart(req, res, link) {
        let titles =  (!Array.isArray(req.body["dmeal"])) ? [req.body["dmeal"]] : req.body["dmeal"];
        let qtys = (!Array.isArray(req.body["qty"])) ? [req.body["qty"]] : req.body["qty"];
        Cart.updateCart(titles, qtys,  (req.session.cart) ? req.session.cart : null)
        res.redirect(`/${link}`)
    },

    login(res, req, params) {
        params.action = "login";

        userModel.findOne({
            email: req.body.lemail
        })
            .then((user) => {
                if (user === null) {
                    params.message = {"lerror": "User Does Not Exist"};
                    this.renderError(res, req, params)
                        .then(() => {});
                } else {
                    bcrypt.compare(req.body.lpassword, user.password)
                        .then((match) => {
                            if (match) {
                                req.session.user = user;
                                if(!req.session.cart) {
                                    req.session.cart = {
                                        items: [],
                                        totals: 0.00,
                                    };
                                }
                                if (req.session.user.super_user) {
                                    res.redirect(`/sdash`)
                                } else {
                                    res.redirect(`/dash`)
                                }
                            } else {
                                params.message = {"lerror": "Invalid Password"};
                                this.renderError(res, req, params)
                                    .then(() => {});
                            }
                        })
                        .catch((error) => {
                            console.log(`Error while comparing passwords: ${error}`)
                        })
                }
            })
            .catch((error) => {
                console.log(`Error while finding user: ${error}`)
            })
    },

    register(res, req, params) {
        params.action = "register";

        const user = new userModel({
            first_name: req.body.fname,
            last_name: req.body.lname,
            email: req.body.email,
            password: req.body.password
        });

        user.save()
            .then(() => {
                req.session.user = user;
                this.send(res, req);
            })
            .catch((error) => {
                if (error.name === 'MongoError' && error.code === 11000) {
                    params.message = {"rerror": "User Already Exists"};
                    this.renderError(res, req, params)
                        .then(() => {
                        });
                } else {
                    console.log(`Error while saving user: ${error}`)
                }
            })
    },

    addMeal(res,req) {
        const meal = new mealModel({
            contains: req.body.contain.split(','),
            top: req.body.top,
            title: req.body.title,
            desc: req.body.desc,
            category: req.body.category,
            price: parseFloat(req.body.price),
            time: parseInt(req.body.cook),
            serving: parseInt(req.body.serv),
            calPerS: parseInt(req.body.cal)
        });

        meal.save()
            .then((mealS) => {
                req.files.image.name = `/uploads/${mealS.title}${path.parse(req.files.image.name).ext}`;
                req.files.image.mv(`public${req.files.image.name}`)
                    .then(() => {
                        mealModel.updateOne({
                            _id: mealS._id
                        }, {
                            img: req.files.image.name
                        })
                            .then(() => {
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                res.redirect('/meals')
            })
            .catch((error) => {
                console.log(`Error while saving meal: ${error}`)
            })
    },

    updateMeal(res, req) {
        console.log(req.body)
        mealModel.updateOne({
            title: req.body.title
        }, {
            $set: {
                contains: req.body.contain.split(','),
                top: req.body.top,
                title: req.body.title,
                desc: req.body.desc,
                category: req.body.category,
                price: parseFloat(req.body.price),
                time: parseInt(req.body.cook),
                serving: parseInt(req.body.serv),
                calPerS: parseInt(req.body.cal)
            }
        })
            .exec()
            .then(() => {res.redirect("/meals")})
            .catch((err) => console.log(err));
    },

    deleteMeal(res,req) {
        console.log(req.body)
        mealModel.deleteOne({
            title: req.body.title
        })
            .exec()
            .then(() => {res.redirect("/meals")})
            .catch((err) => console.log(err));
    },

    postInfo(res, req, params) {
        if(req.body.action === "login" ) {
            var {passed, message, action} = validation.checkLogin(req);
        } else if(req.body.action === "register")  {
            var {passed, message, action} = validation.checkRegister(req)
        } else if(req.body.action === "addMeal") {
            var {passed, message, action} = validation.checkMeal(req)
        } else if(req.body.action === "updateMeal") {
            var {passed, message, action} = validation.checkMeal(req, false)
        } else if(req.body.action === "deleteMeal") {
            var {passed, action} = {passed: true, action: "deleteMeal"}
        }

        if(passed) {
            if (action === 'login') {
                this.login(res,req,params)
            } else if (action === 'register') {
                this.register(res,req,params)
            } else if(action === 'addMeal') {
                this.addMeal(res, req, params)
            } else if(action === 'updateMeal') {
                this.updateMeal(res,req)
            } else if(action === 'deleteMeal') {
                this.deleteMeal(res,req)
            }
        } else {
            params.action = action;
            params.message = message;
            this.renderError(res, req, params)
                .then(() => {});
        }
    }
}
module.exports = postMethods;