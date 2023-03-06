import React from "react";
import Card from "./Card";
import Carousel from "./Carousel";

export default function Body() {
    return (
        <div>
            <Carousel />
            <div>
                <Card />
            </div>
        </div>
    );
}
