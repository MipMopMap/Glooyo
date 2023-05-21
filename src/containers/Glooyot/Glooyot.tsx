import React, { FC } from "react";
import "./Glooyot.css";
import { Glooya } from "../../components";

type GlooyotProps = {
  data: any[];
  deleteID: (documentId: string) => Promise<void>;
  setEditedGlooya: React.Dispatch<
    React.SetStateAction<
      | {
          title: string;
          price: number;
          imageURL1: string;
          imageURL2: string;
          paragraph: string;
          selectOptions?:
            | {
                value: string;
                label: string;
              }[]
            | undefined;
          id: string;
          position: boolean;
        }
      | undefined
    >
  >;
  scrollableDivRef: any;
  setOpenImage: any;
};

const Glooyot: FC<GlooyotProps> = ({
  data,
  deleteID,
  setEditedGlooya,
  scrollableDivRef,
  setOpenImage,
}) => {
  return (
    <div className="glooyot-wrapper" ref={scrollableDivRef}>
      {data?.map((glooya: any, i: any) => (
        <Glooya
          glooya={glooya}
          key={i}
          deleteID={deleteID}
          setEditedGlooya={setEditedGlooya}
          setOpenImage={setOpenImage}
        />
      ))}
    </div>
  );
};

export default Glooyot;
