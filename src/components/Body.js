import React, { useState } from "react";
import Card from "./Card";
import Carousel from "./Carousel";

export default function Body(props) {
    const [search, setSearch] = useState("");

    const searchHandler = (newSearch) => {
        setSearch(newSearch);
    };

    return (
        <div>
            <Carousel onSearchUpdate={searchHandler} />
            <div className="container">
                {props.foodCategories.map((foodCategory) => {
                    return (
                        <div className="row m-3" key={foodCategory._id}>
                            <h3>{foodCategory.CategoryName}</h3>
                            <hr />
                            {props.foodItems
                                .filter(
                                    (item) =>
                                        item.CategoryName ===
                                            foodCategory.CategoryName &&
                                        (search === "" ||
                                        item.name
                                            .toLowerCase()
                                            .includes(search.toLowerCase()))
                                )
                                .map((foodItem) => (
                                    <div
                                        key={foodItem._id}
                                        className="col-sm col-md-6 col-lg-3"
                                    >
                                        <Card
                                            name={foodItem.name}
                                            imgSrc={foodItem.img}
                                            options={foodItem.options[0]}
                                            description={foodItem.description}
                                        />
                                    </div>
                                ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
