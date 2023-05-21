import React, { FC, useState } from "react";
import "./MyInput.css"; // Import the CSS file for styling

type MyInputProps = {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  isRequired: boolean;
};

const MyInput: FC<MyInputProps> = ({ name, onChange, value, isRequired }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`cool-input ${isFocused ? "focused" : ""}`}>
      {isRequired ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
      <label className={isFocused || value ? "label-out" : ""}>{name}</label>
      {/* <div className="underline"></div> */}
    </div>
  );
};

export default MyInput;

// await addDoc(collection(db, "tags"), selectOptions);
// console.log("New tag added successfully");

// console.error("Error adding new tag:", error);
