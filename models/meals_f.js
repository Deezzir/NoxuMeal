var meals_f = {
    fakeDB: [{
                id: 1,
                title: "Borsch",
                img: "/images/borsch.jpeg",
                contains: [
                    "tomato",
                    "beef",
                    "potato",
                    "spices"
                ],
                desc: "Traditional Russian soup with vegetables and meat",
                category: "Classic",
                price: 20.1,
                time: 30,
                serving: 4,
                calPerS: 900,
                top: false
            },
            {
                id: 2,
                title: "Meatballs Pasta",
                img: "/images/meatballs.jpeg",
                contains: [
                    "tomato",
                    "beef",
                    "pasta",
                    "spices",
                    "parmesan"
                ],
                desc: "Traditional Swedish meal with MeatBalls",
                category: "Classic",
                price: 19.99,
                time: 45,
                serving: 4,
                calPerS: 950,
                top: true
            },
            {
            id: 3,
            title: "Chicken Curry",
            img: "/images/chicken.jpeg",
            contains: [
                "curry",
                "chicken",
                "rice",
                "vegetables"
            ],
            desc: "Indian Chicken with rice and spices",
            category: "Classic",
            price: 15.99,
            time: 25,
            serving: 4,
            calPerS: 780,
            top: true
        },
        {
            id: 4,
            title: "Chicken Caesar",
            img: "/images/caesar.jpg",
            contains: [
                "chicken",
                "lettuce",
                "sauce",
                "bread"
            ],
            desc: "Fresh and nourishing salad",
            category: "Classic",
            price: 12.99,
            time: 15,
            serving: 2,
            calPerS: 450,
            top: false
        },
        {
            id: 5,
            title: "Źurek",
            img: "/images/zurek.png",
            contains: [
                "white sausage",
                "eggs",
                "sour rye",
                "bread"
            ],
            desc: "Fresh and nourishing soup with sausage",
            category: "Classic",
            price: 14.99,
            time: 20,
            serving: 1,
            calPerS: 850,
            top: true
        },
        {
            id: 7,
            title: "Syrniki",
            img: "/images/syrniki.jpeg",
            contains: [
                "cheese",
                "eggs",
                "sugar",
                "vegetable oil"
            ],
            desc: "Eastern-European dessert",
            category: "Classic",
            price: 8.99,
            time: 17,
            serving: 1,
            calPerS: 645,
            top: false
        },
        {
            id: 6,
            title: "Ramen",
            img: "/images/ramen.jpg",
            contains: [
                "egg",
                "noodles",
                "chicken",
                "spices",
                "onions",
                "corn"
            ],
            desc: "Perfect Soup",
            category: "soup",
            price: 18.99,
            time: 30,
            serving: 2,
            calPerS: 600,
            top: false
        }
    ],

    getDB() { return this.fakeDB; }
}


module.exports = meals_f;