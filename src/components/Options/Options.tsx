import React, { FC, useState } from "react";
import "./Options.css";
interface OptionsInt {
  handleSortBy: (field: string, order: string) => void;
  scrollToTop: () => void;
}
const Options: FC<OptionsInt> = ({ handleSortBy, scrollToTop }) => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="options">
      <button
        className={`sort-button ${
          selectedOption === "uploadedAt" && "selected-option"
        }`}
        onClick={() => [
          handleSortBy("uploadedAt", "desc"),
          scrollToTop(),
          setSelectedOption("uploadedAt"),
          console.log(selectedOption),
        ]}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#FFFFFF"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
        </svg>
      </button>
      <button
        onClick={() => [
          handleSortBy("price", "asc"),
          setSelectedOption("asc"),
          scrollToTop(),
        ]}
        className={`sort-button ${
          selectedOption === "asc" && "selected-option"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#FFFFFF"
        >
          <rect fill="none" height="24" width="24" />
          <path d="M19.71,9.71L22,12V6h-6l2.29,2.29l-4.17,4.17c-0.39,0.39-1.02,0.39-1.41,0l-1.17-1.17c-1.17-1.17-3.07-1.17-4.24,0L2,16.59 L3.41,18l5.29-5.29c0.39-0.39,1.02-0.39,1.41,0l1.17,1.17c1.17,1.17,3.07,1.17,4.24,0L19.71,9.71z" />
        </svg>
      </button>
      <button
        onClick={() => [
          handleSortBy("price", "desc"),
          setSelectedOption("desc"),
          scrollToTop(),
        ]}
        className={`sort-button ${
          selectedOption === "desc" && "selected-option"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#FFFFFF"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z" />
        </svg>
      </button>
    </div>
  );
};

export default Options;
