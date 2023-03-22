const mongoose = require("mongoose");

const mongoURI =
    "mongodb+srv://nitin:nitin@cluster0.eifi2fe.mongodb.net/gofooddb?retryWrites=true&w=majority";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log(`Connection complete`);

        const foodItemsCollection = await mongoose.connection.db.collection(
            "food_items"
        );

        const foodItems = await foodItemsCollection.find({}).toArray();

        const foodCategoryCollection = await mongoose.connection.db.collection(
            "food_categories"
        );

        const foodCategories = await foodCategoryCollection.find({}).toArray();

        global.foodItems = foodItems;
        global.foodCategories = foodCategories;
    } catch (error) {
        console.log(error);
    }
};

module.exports = mongoDB;
