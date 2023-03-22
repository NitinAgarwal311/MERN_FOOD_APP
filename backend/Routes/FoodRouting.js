const express = require("express");
const router = express.Router();

router.get("/foodData", async (req, res) => {
    try {
        return res
            .json({
                foodItems: global.foodItems,
                foodCategories: global.foodCategories,
            })
            .status(200);
    } catch (error) {
        return res.status(400).json({ errors: error });
    }
});

module.exports = router;
