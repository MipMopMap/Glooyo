import React, { FC, useState } from "react";
import "./Search.css";
import MyInput from "../MyInput/MyInput";
interface SearchInt {
  onChange: (e: {
    target: {
      value: React.SetStateAction<string>;
    };
  }) => void;
  isRTL: boolean;
  value: string;
  options:
    | {
        [x: string]: any;
      }[]
    | undefined;
}
const Search: FC<SearchInt> = ({ onChange, isRTL, value, options }) => {
  const searchToggle = () => {
    if (!openSearch) {
      setClosing(true);
      setTimeout(function () {
        setOpenSearch(true);
        setClosing(false);
      }, 500);
    } else {
      setOpenSearch(false);
    }
  };

  const [openSearch, setOpenSearch] = useState(true);
  const [closing, setClosing] = useState(false);
  return (
    <div className="searchBox">
      {openSearch ? (
        <div onClick={searchToggle} className="closed-search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </div>
      ) : (
        <div className={`open-search ${closing && "closing-search"}`}>
          <div className="close-search" onClick={searchToggle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="14px"
              viewBox="0 0 24 24"
              width="14px"
              fill="#1f1f1f"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </div>
          <MyInput
            name={isRTL ? "חיפוש..." : "Search..."}
            onChange={onChange}
            value={value}
            isRequired
          />
        </div>
      )}
      <select onChange={onChange} className="search-tag">
        <option value="">Filter By Tag</option>
        {options?.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Search;
