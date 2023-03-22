import React, { useEffect, useState } from "react";
import Body from "../components/Body";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


export default function Home() {

    const [foodItems, setFoodItems] = useState([]);
    const [foodCategories,setFoodCategories] = useState([]);

    const loadFoodData = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/foodData");
            const data = await response.json();
            setFoodItems(data.foodItems);
            setFoodCategories(data.foodCategories);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadFoodData();
    },[]);

    return (
        <div>
            <Navbar />
            <Body foodItems={foodItems} foodCategories={foodCategories}/>
            <Footer />
        </div>
    );
}
