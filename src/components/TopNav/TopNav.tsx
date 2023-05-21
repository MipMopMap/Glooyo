import React, { FC } from "react";
import "./TopNav.css";
import Search from "../Search/Search";

interface TopNavInt {
  scroll: boolean;
  handleInputChange: (e: {
    target: {
      value: React.SetStateAction<string>;
    };
  }) => void;
  isRTL: boolean;
  queryString: string;
  options:
    | {
        [x: string]: any;
      }[]
    | undefined;
}

const TopNav: FC<TopNavInt> = ({
  scroll,
  handleInputChange,
  isRTL,
  queryString,
  options,
}) => {
  return (
    <div className={`top-nav ${scroll && "scroll"}`}>
      <h1>Glooyot</h1>
      <Search
        onChange={handleInputChange}
        isRTL={isRTL}
        value={queryString}
        options={options}
      />
    </div>
  );
};

export default TopNav;
