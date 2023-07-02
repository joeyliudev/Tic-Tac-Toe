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
          <i className="fa-sharp fa-solid fa-x medium-icon-size turquoise logo-margin"></i>
          <i className="fa-sharp fa-solid fa-o medium-icon-size yellow logo-margin"></i>
        </div>
      </div>
    </div>
  );
}

function Indicator({ currentPlayer }: IndicatorProp) {
  return (
    <div className="headerBox">
      <div className="shadow indicatorLayout small-border-radius">
        <div className="indicator">
          <i
            className={classNames(
              "fa-sharp",
              "fa-solid",
              "small-icon-size",
              "logo-margin",
              "light-gray",
              currentPlayer === 1 ? "fa-x" : "fa-o"
            )}
          ></i>
          <span className="turn medium-font">TURN</span>
        </div>
      </div>
    </div>
  );
}

function RestButton({ callback }: ButtonProp) {
  return (
    <div className="headerBox">
      <div className="restButtonLayout">
        <div
          className="resetButtonStyle shadow medium-font small-border-radius"
          onClick={() => callback()}
        >
          <i className="fa-sharp fa-solid fa-arrow-rotate-right dark-gray"></i>
        </div>
      </div>
    </div>
  );
}
