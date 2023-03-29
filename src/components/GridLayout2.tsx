import React from "react";
import styled from "./GridLayout2.module.css";

const GridLayout2 = () => {
  return (
    <>
      <li className={styled.Card}>
        <p>テキスト</p>
        <span className={styled.Card_span}>右下に置かれる何か</span>
      </li>
    </>
  );
};

export default GridLayout2;
