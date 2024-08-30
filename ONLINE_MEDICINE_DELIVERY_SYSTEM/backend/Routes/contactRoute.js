const express = require("express");
const router = express.Router();
const Contact = require('../model/Contact');

router.post('/contact', async (req, res) => {
    try {
        const { fullName, email, message, city } = req.body;
        let newContact = new Contact({
            fullName, email, message, city
        })
        newContact.save();
        console.log("newContact has been saved")
        res.json({success : true});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = router;