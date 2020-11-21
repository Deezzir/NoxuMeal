var validation = {
    checkLogin(body) {
        const {lemail, lpassword, action} = body;
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
            action: "login"
        };
    },

    checkRegister(body) {
        const {fname, lname, email, password, action} = body;
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
            action: "register"
        };
    },

}

module.exports = validation;