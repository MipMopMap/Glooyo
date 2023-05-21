import React, { FC, useState } from "react";
import "./OpenImage.css";

interface OpenImageInt {
  openImage: any;
  setOpenImage: any;
}
const OpenImage: FC<OpenImageInt> = ({ openImage, setOpenImage }) => {
  const [closing, setClosing] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [front, setFront] = useState(true);

  const handleClick = () => {
    let newRotation = rotation + 90;

    if (newRotation >= 360) {
      newRotation = 0;
    }

    setRotation(newRotation);
  };

  const imageStyle = {
    transform: `rotate(${rotation}deg)`,
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(function () {
      setOpenImage(false);
      setClosing(false);
    }, 500);
  };

  return (
    <div className={`open-image-wrapper ${closing && "go-reverse"}`}>
      <button onClick={handleClose} className="close-form">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#1f1f1f"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>

      <div className="expand-wrapper">
        <div className="open-image-options">
          <button onClick={handleClick} className="rotate-image">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="m19 8-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z" />
            </svg>
          </button>
          <button
            onClick={() => [setFront(!front), setRotation(0)]}
            className="rotate-image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#1f1f1f"
            >
              <rect fill="none" height="24" width="24" />
              <path d="M14.59,7.41L18.17,11H6v2h12.17l-3.59,3.59L16,18l6-6l-6-6L14.59,7.41z M2,6v12h2V6H2z" />
            </svg>
          </button>
        </div>
        <div className="column-wrapper">
          {front ? (
            <div
              className={`expand-column ${
                openImage.position && "vertical-expand"
              }`}
            >
              <div className="expand-content" style={imageStyle}>
                <img src={openImage.img1} alt="" />
              </div>
            </div>
          ) : (
            <div
              className={`expand-column  ${
                openImage.position && "vertical-expand"
              }`}
            >
              <div className="expand-content" style={imageStyle}>
                <img src={openImage.img2} alt="" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenImage;
