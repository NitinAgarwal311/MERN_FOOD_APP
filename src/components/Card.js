import React from "react";

export default function Card() {
    return (
        <div>
            <div class="card rounded" style={{"width": "18rem", "maxHeight":"360px"}}>
                <img src="..." class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">Title</h5>
                    <p class="card-text">
                        This is the text.
                    </p>
                    <div>
                        <select className="bg-primary rounded p-1">
                            {Array.from({length: 6},(_, i) => {
                                return (
                                    <option value={i+1}>{i+1}</option>
                                )
                            })}
                        </select>
                        <select className="bg-primary m-2 p-1 rounded">
                            <option value="half">Half</option>
                            <option value="full">Full</option>
                        </select>

                        <div className="m-2 d-inline fs-5">
                            Total Price
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
