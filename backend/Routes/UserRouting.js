const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = "secret";

router.post(
    "/createuser",
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcryptjs.genSalt(10);
        const secPassword = await bcryptjs.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location,
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error.keyValue);
            if (error.name === "MongoServerError" && error.code === 11000) {
                let uniqueFields = "";
                Object.keys(error.keyValue).forEach((key) => {
                    uniqueFields = uniqueFields.concat(key).concat(',');
                });
                uniqueFields = uniqueFields.slice(0,uniqueFields.length-1);
                return res
                    .status(400)
                    .json({ error: `${uniqueFields} should be unique` });
            }
            return res.status(400).json({ error: "Something went wrong" });
        }
    }
);

router.post(
    "/login",
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().toString() });
        }

        try {
            const userData = await User.findOne({ email: req.body.email });
            if (userData === null) {
                return res.status(400).json({ errors: "User not found" });
            }
            const cmpPwd = await bcryptjs.compare(
                req.body.password,
                userData.password
            );

            if (!cmpPwd) {
                return res.status(400).json({ errors: "Invalid Credentials" });
            }

            const data = {
                user: {
                    id: userData.id,
                },
            };

            const authToken = jwt.sign(data, jwtSecret);

            res.status(200).json({ success: true, authToken: authToken });
        } catch (error) {
            console.log(error);
            res.status(400).json({ errors: error });
        }
    }
);

module.exports = router;
