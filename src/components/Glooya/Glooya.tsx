import React, { FC, useState } from "react";
import "./Glooya.css";

type GlooyaProps = {
  glooya: {
    title: string;
    price: number;
    imageURL1: string;
    imageURL2: string;
    paragraph: string;
    selectOptions?: {
      value: string;
      label: string;
    }[];
    id: string;
    position: boolean;
  };
  deleteID: (documentId: string) => Promise<void>;
  setEditedGlooya: React.Dispatch<
    React.SetStateAction<
      | {
          title: string;
          price: number;
          imageURL1: string;
          imageURL2: string;
          paragraph: string;
          selectOptions?: {
            value: string;
            label: string;
          }[];
          id: string;
          position: boolean;
        }
      | undefined
    >
  >;
  setOpenImage: any;
};

const Glooya: FC<GlooyaProps> = ({
  glooya,
  deleteID,
  setEditedGlooya,
  setOpenImage,
}) => {
  const [flip, setFlip] = useState(false);

  const DeleteButton = () => {
    deleteID(glooya.id);
  };

  const edit = () => {
    setEditedGlooya(glooya);
  };

  const expand = () => {
    setOpenImage({
      img1: glooya.imageURL1,
      img2: glooya.imageURL2,
      position: glooya.position,
    });
  };

  return (
    <div className="glooya-wrapper">
      <div
        className={`glooya-glooya ${!glooya.position && "glooya-horizontal"}`}
        onClick={() => setFlip(!flip)}
      >
        <div className={`glooya-inner ${flip && "isFlipped"}`}>
          <div className="glooya-content glooya-front">
            <img src={glooya.imageURL1} alt="" />
          </div>
          <div className="glooya-content glooya-back">
            <img src={glooya.imageURL2} alt="" />
          </div>
        </div>
      </div>
      <div className="glooya-text">
        <div>
          <h1>{glooya.title}</h1>
          <p>{glooya.paragraph}</p>
        </div>
        <div>
          <div className="tags-container">
            {glooya.selectOptions?.map((tag, i) => (
              <li key={i} className="tags">
                <p>{tag.label}</p>
              </li>
            ))}
          </div>

          <p className="glooya-price">${glooya.price}</p>
          <div>
            <div className="glooya-end">
              <button onClick={expand} className="edit-glooya">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#FFFFFF"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M4 20h16v2H4zM4 2h16v2H4zm9 7h3l-4-4-4 4h3v6H8l4 4 4-4h-3z" />
                </svg>
              </button>
              <button onClick={edit} className="edit-glooya">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#FFFFFF"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
              </button>
              <button onClick={DeleteButton} className="edit-glooya">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#FFFFFF"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Glooya;
