import { useState } from "react";
import "./Head.css";
import classNames from "classnames";

interface HeadProps {
  currentPlayer: number;
  resetClickCallback: () => void;
}

interface IndicatorProp {
  currentPlayer: number;
}

interface ButtonProp {
  callback: () => void;
}

export default function Head({ currentPlayer, resetClickCallback }: HeadProps) {
  return (
    <>
      <Logo></Logo>
      <Indicator currentPlayer={currentPlayer}></Indicator>
      <RestButton callback={() => resetClickCallback()}></RestButton>
    </>
  );
}

function Logo() {
  return (
    <div className="headerBox">
      <div className="logoLayout">
        <div className="logoStyle">
          <i className="fa-sharp fa-solid fa-x fa-3x more-bold-turquoise turquoise logo-margin"></i>
          <i className="fa-sharp fa-solid fa-o fa-3x more-bold-yellow yellow logo-margin"></i>
        </div>
      </div>
    </div>
  );
}

function Indicator({ currentPlayer }: IndicatorProp) {
  return (
    <div className="headerBox">
      <div className="shadow indicatorLayout">
        <div className="indicator">
          <i
            className={classNames(
              "fa-sharp",
              "fa-solid",
              "fa-2x",
              "logo-margin",
              "more-bold-light-gray",
              "light-gray",
              currentPlayer === 1 ? "fa-x" : "fa-o"
            )}
          ></i>
          <span className="turn">TURN</span>
        </div>
      </div>
    </div>
  );
}

function RestButton({ callback }: ButtonProp) {
  return (
    <div className="headerBox">
      <div className="restButtonLayout">
        <div className="resetButtonStyle shadow" onClick={() => callback()}>
          <i className="fa-sharp fa-solid fa-2x fa-arrow-rotate-right more-bold-dark-gray dark-gray"></i>
        </div>
      </div>
    </div>
  );
}
