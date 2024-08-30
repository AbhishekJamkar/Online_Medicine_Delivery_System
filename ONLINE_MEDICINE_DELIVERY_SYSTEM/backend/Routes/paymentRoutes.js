const express = require("express");
const router = express.Router();
const stripe = require("stripe")('sk_test_51Ngv7tSC0oXopJ4ioMZT4b3gFeVtwNLFOjgDYNVhtzN5LycxFTcXm8Rx9dL21r2SMYD35RYKJaYaAoMgDbNdsfHX00u6WV5eLV')

router.post("/payment", (req, res) => {
    // Getting Product details and token from the client side
    const { product, token, price } = req.body;

    console.log(`Payment of ${price} is successfully Completed !!!`);


    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then((customer) => {

        stripe.charges.create({
            amount: price * 100,
            currency: "INR",
            customer: customer.id,
            receipt_email: token.email,
            description: "Processing Payment",

        })
    }).then(result => res.status(200).json(result)).catch(err => console.log(err))

})

module.exports = router;