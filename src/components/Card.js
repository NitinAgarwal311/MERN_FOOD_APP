import React from "react";

export default function Card(props) {
    const priceOptions = Object.keys(props.options);

    return (
        <div className="m-3">
            <div className="card rounded" style={{ width: "18rem", maxHeight: "360px"}}>
                <img
                    src={props.imgSrc}
                    className="card-img-top"
                    alt={props.name}
                    style={{height: '120px', objectFit: 'fill'}}
                />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.description}</p>
                    <div>
                        <select className="bg-primary rounded p-1">
                            {Array.from({ length: 6 }, (_, i) => {
                                return (
                                    <option value={i + 1} key={i + 1}>
                                        {i + 1}
                                    </option>
                                );
                            })}
                        </select>
                        <select className="bg-primary m-2 p-1 rounded">
                            {priceOptions.map((data) => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>

                        <div className="m-2 d-inline fs-5">Total Price</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
