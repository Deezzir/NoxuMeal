class Cart {
    constructor() {
        this.data = {};
        this.data.items = [];
        this.data.totals = 0.0;
    }

    static addToCart(meal = null, qty = 1, cart) {
        if(!this.inCart(meal.title, cart)) {
            let prod = {
                title: meal.title,
                price: meal.price,
                qty: qty,
                image: meal.img,
            };
            cart.items.push(prod);
        }
        this.calculateTotals(cart);
    }

    static removeFromCart(title = "", cart) {
        for(let i = 0; i < cart.items.length; i++) {
            let item = cart.items[i];
            if(item.title === title) {
                cart.items.splice(i, 1);
                this.calculateTotals(cart);
            }
        }
    }

    static updateCart(titles = [], qtys = [], cart) {
        let map = [];
        let updated = false;

        titles.forEach((title, index) => {
            map.push({
                title: title,
                qty: parseInt(qtys[index], 10)
            });
        });

        map.forEach((obj, index) => {
            if(obj.qty > 0 && obj.qty !== cart.items[index].qty) {
                cart.items[index].qty = obj.qty;
                updated = true;
            } else if(obj.qty === 0) {
                this.removeFromCart(obj.title, cart)
            }
        });
        if(updated) {
            this.calculateTotals(cart);
        }
    }

    static inCart(title = "", cart) {
        let found = false;
        cart.items.forEach(item => {
            if(item.title === title) {
                found = true;
            }
        });
        this.calculateTotals(cart)
        return found;
    }

    static calculateTotals(cart) {
        cart.totals = 0.00;
        cart.items.forEach(item => {
            item.totals = Math.round((item.price * item.qty + Number.EPSILON) * 100) / 100;
            cart.totals += Math.round((item.price * item.qty + Number.EPSILON) * 100) / 100;
        });
    }

    static emptyCart(req) {
        if(req.session) {
            req.session.cart.items = [];
            req.session.cart.totals = 0.00;
        }
    }
}

module.exports = Cart;