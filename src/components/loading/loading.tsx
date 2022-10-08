import React from "react";
import loading from "./loading.module.scss";

const Loading = () => {
    return (
        <div className={loading.wrapper}>
            <div className={loading.spinner}>
            </div>
        </div>
    )
}

export default Loading