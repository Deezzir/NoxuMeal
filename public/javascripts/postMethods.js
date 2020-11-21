const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const bcrypt = require('bcrypt')
const userModel = require("../../models/Users")
const validation = require('./validation')

const meals = require('./meals')

var postMethods = {
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
            .catch((error) => {
                console.log(`Error ${error} ${req.body}`);

                res.render("index/index", {
                    title: "Main Page",
                    file: "index.css",
                    data: meals.getDB(),
                    layout: 'main',
                });
            });
    },

    renderError(res, req, params) {
        res.render(params.view, {
            title: params.title,
            file: params.file,
            data: meals.getDB(),
            kak: params.action,
            layout: 'main',
            message: params.message,
            values: req.body
        });
    },

    postInfo(res, req, params) {
        console.log(req.body);
        const {passed, message, action} = req.body.action === "login" ? validation.checkLogin(req.body) :
            validation.checkRegister(req.body)

        if (passed && action === 'login') {
            userModel.findOne({
                email: req.body.lemail
            })
                .then((user) => {
                    if (user === null) {
                        params.action = action;
                        params.message = {"error": "User Does Not Exist"};
                        this.renderError(res, req, params);
                    } else {
                        bcrypt.compare(req.body.lpassword, user.password)
                            .then((match) => {
                                if (match) {
                                    req.session.user = user;
                                    if (user.super_user) {
                                        res.redirect(`/sdash`)
                                    } else {
                                        res.redirect(`/sdash`)
                                    }

                                } else {
                                    params.action = action;
                                    params.message = {"error": "Invalid Password"};
                                    this.renderError(res, req, params);
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
        } else if (passed && action === 'register') {
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
                        params.action = action;
                        params.message = {"error": "User Already Exists"};
                        this.renderError(res, req, params);
                    } else {
                        console.log(`Error while saving user: ${error}`)
                    }
                })
        } else {
            params.action = action;
            params.message = message;
            this.renderError(res, req, params);
        }
    }
}
module.exports = postMethods;