import React from "react";
import styled from "./GridLayout.module.css";

const GridLayout = () => {
  return (
    <div className={styled["grid-container"]}>
      <div className={styled["grid-item"]}>header</div>
      <div className={styled["grid-item"]}>main</div>
      <div className={styled["grid-item"]}>side</div>
      <div className={styled["grid-item"]}>footer</div>
    </div>
  );
};

export default GridLayout;
