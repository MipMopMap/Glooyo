import React, { FC } from "react";
import "./FormSelector.css";
import { Form } from "../../components";
import { Firestore } from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";
interface FormSelectorInt {
  editedGlooya:
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
    | undefined;
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
  openForm: boolean;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  db: Firestore | null;
  storage: FirebaseStorage | null;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  fetchData: () => Promise<void>;
  setOptions: React.Dispatch<
    React.SetStateAction<
      | {
          [x: string]: any;
        }[]
      | undefined
    >
  >;
  options:
    | {
        [x: string]: any;
      }[]
    | undefined;
}
const FormSelector: FC<FormSelectorInt> = ({
  editedGlooya,
  openForm,
  setOpenForm,
  db,
  storage,
  setData,
  setEditedGlooya,
  fetchData,
  setOptions,
  options,
}) => {
  return (
    <>
      {editedGlooya && (
        <Form
          db={db}
          storage={storage}
          setData={setData}
          editedGlooya={editedGlooya}
          setEditedGlooya={setEditedGlooya}
          setOpenForm={setOpenForm}
          updateData={fetchData}
          setOptions={setOptions}
          options={options}
        />
      )}
      {openForm && (
        <Form
          db={db}
          storage={storage}
          setData={setData}
          setOpenForm={setOpenForm}
          updateData={fetchData}
          setOptions={setOptions}
          options={options}
        />
      )}
    </>
  );
};

export default FormSelector;
