var validation = {
    checkLogin(req) {
        const {lemail, lpassword, action} = req.body;
        let passed = true;
        let message = {email: "", password: ""};

        if (typeof lemail !== 'string' || lemail.length === 0) {
            passed = false;
            message.email = "Please, enter a valid email";
        }

        if (typeof lpassword !== 'string' || lpassword.length === 0) {
            passed = false;
            message.password = "Please, enter a password";
        }

        return {
            passed: passed,
            message: message,
            action: action
        };
    },

    checkRegister(req) {
        const {fname, lname, email, password, action} = req.body;
        let passed = true;
        let message = {fname: "", lname: "", remail: "", rpassword: ""};

        if (typeof fname !== 'string' || fname.length < 3) {
            passed = false;
            message.fname = "First name two short";
        }

        if (typeof lname !== 'string' || lname.length < 3) {
            passed = false;
            message.lname = "Last name two short";
        }

        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (typeof email !== 'string' || email.length === 0 || !re.test(email)) {
            passed = false;
            message.remail = "Please, enter a valid email ";
        }

        const re1 = /[^A-Za-z0-9]+/ig
        if (typeof password !== 'string' || password.length < 6 || password.length > 12 || re1.test(password)) {
            passed = false;
            message.rpassword = "Please, enter a valid password";
        }

        return {
            passed: passed,
            message: message,
            action: action
        };
    },

    checkMeal(req, img=true) {
        let passed = true;
        let message = {merror : ""};
        let imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;

        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] !== 'string' || req.body[key].length === 0) {
                passed = false;
                message.merror = "Please, enter valid info";
            }
        })
        if(img)
            if(!req.files) {
                passed = false;
                message.ierror = "Please, upload an image";
            } else if(!imageReg.test(req.files.image.name)) {
                passed = false;
                message.ierror = "Please, upload a valid an image";
            }

        return {
            passed: passed,
            message: message,
            action: req.body.action
        };
    }

}

module.exports = validation;