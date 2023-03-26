import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

export default function Modal(props) {
    const portalElement = document.getElementById("modal");

    return ReactDOM.createPortal(
        <>
            <div className={classes.overlay} onClick={props.closeModal} />
            <div className={classes.modal}>
                <span
                    style={{
                        position: "absolute",
                        top: "1rem",
                        right: "1.5rem",
                        cursor: "pointer"
                    }}
                    onClick={props.closeModal}
                >
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        size={"xl"}
                        style={{ color: "red" }}
                    />
                </span>
                <div style={{padding:"1.5rem"}}>{props.children}</div>
            </div>
        </>,
        portalElement
    );
}
