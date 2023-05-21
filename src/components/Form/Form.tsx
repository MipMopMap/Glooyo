import React, { FC, useState, useEffect } from "react";
import "./Form.css";
import {
  FirebaseStorage,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  Firestore,
  arrayUnion,
} from "firebase/firestore";
import { MyInput } from "..";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";

type FormProps = {
  db: Firestore | null;
  storage: FirebaseStorage | null;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  editedGlooya?: any;
  setEditedGlooya?: React.Dispatch<
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
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  updateData: () => void;
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
};

const Form: FC<FormProps> = ({
  db,
  storage,
  setData,
  editedGlooya,
  setEditedGlooya,
  setOpenForm,
  updateData,
  setOptions,
  options,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<{
    [key: string]: File | null;
  }>({
    file1: null,
    file2: null,
  });
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    paragraph: "",
    selectOptions: [],
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [position, setPosition] = useState<boolean>(true);
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>(
    editedGlooya?.selectOptions || []
  );

  type SelectOption = {
    label: string;
    value: string;
  };

  const animatedComponents = makeAnimated();

  useEffect(() => {
    const filteredSelectOptions = selectOptions.map(({ label, value }) => ({
      label,
      value,
    }));
    if (
      JSON.stringify(filteredSelectOptions) !== JSON.stringify(selectOptions)
    ) {
      setSelectOptions(filteredSelectOptions);
      console.log(selectOptions);
    }
  }, [selectOptions]);

  const handleTagChange = (newOption: any) => {
    if (newOption && newOption.value && newOption.label) {
      setOptions((prevOptions) => {
        const optionExists = prevOptions?.find(
          (option) => option.value === newOption.value
        );
        if (!optionExists) {
          if (prevOptions) {
            return [...prevOptions, newOption];
          }
        }
        return prevOptions;
      });
    }

    setSelectOptions(newOption);
  };

  useEffect(() => {
    if (editedGlooya) {
      const {
        title = "",
        price = "",
        paragraph = "",
        selectOptions = [{ value: "", label: "" }],
      } = editedGlooya;
      setFormData({ title, price, paragraph, selectOptions });
      setPosition(editedGlooya.position);
      setSelectOptions(selectOptions); // Add this line to update the selectOptions state
    }
  }, [editedGlooya]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      setSelectedFiles((prevSelectedFiles) => ({
        ...prevSelectedFiles,
        [name]: file,
      }));
    };

  const uploadImage = async (file: File | null, name: string) => {
    if (!storage) return;
    if (!file) {
      return editedGlooya ? editedGlooya[name] : "";
    }

    const timestamp = new Date().getTime();
    const filename = `${timestamp}-${file.name}`;

    if (editedGlooya && editedGlooya[name]) {
      const oldImageRef = ref(storage, editedGlooya[name]);
      await deleteObject(oldImageRef).catch((error) => {
        console.error(`Error deleting old \\${name}:`, error);
        throw error;
      });
    }

    const storageRef = ref(storage, `images/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error(`Error uploading \${name}:`, error);
          alert(
            `An error occurred while uploading \${name}: \${error.message}`
          );
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(storageRef);
          resolve(downloadURL);
        }
      );
    });
  };

  const uploadImages = async () => {
    if (!db) return;
    setIsUploading(true);

    try {
      const [downloadURL1, downloadURL2] = await Promise.all([
        uploadImage(selectedFiles.file1, "imageURL1"),
        uploadImage(selectedFiles.file2, "imageURL2"),
      ]);

      console.log("Uploading selectOptions:", selectOptions);
      const tagId = "qRr1q9efOCEBxjMW95N5";

      await updateDoc(doc(db, "tags", tagId), {
        selectOptions: arrayUnion(...selectOptions),
      });

      console.log("New tag added successfully");
      const newData = {
        imageURL1: downloadURL1,
        imageURL2: downloadURL2,
        position: position,
        ...formData,
        selectOptions: selectOptions,
        uploadedAt: serverTimestamp(),
      };

      if (editedGlooya) {
        await updateDoc(doc(db, "glooyaData", editedGlooya.id), newData).catch(
          (error) => {
            console.error("Error updating document:", error);
            alert(
              "An error occurred while updating the document. Please try again."
            );

            throw error;
          }
        );
        setData((prevData: any) =>
          prevData.map((item: any) =>
            item.id === editedGlooya.id ? { ...newData, id: item.id } : item
          )
        );
        setEditedGlooya?.(undefined);
      } else {
        await addDoc(collection(db, "glooyaData"), newData).catch((error) => {
          console.error("Error adding document:", error);
          alert(
            "An error occurred while adding a new document. Please try again."
          );

          throw error;
        });
        setData((prevData: any) => [...prevData, newData]);
        setOptions((prevData: any) => [...prevData, selectOptions]);

        updateData();
      }

      console.log("Images uploaded and data stored successfully!");
    } catch (error) {
      console.error("Error uploading images and data:", error);
      alert(
        "An error occurred while uploading images and data. Please try again."
      );
      console.error("Error adding new tag:", error);
      alert("An error occurred while adding a new tag. Please try again.");
    } finally {
      setOpenForm(false);
      setIsUploading(false);
      setSelectedFiles({ file1: null, file2: null });

      setEditedGlooya?.(undefined);
      setFormData({ title: "", price: "", paragraph: "", selectOptions: [] });
      setUploadProgress(0);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editedGlooya) {
      if (!selectedFiles || !formData.title) {
        alert(
          "Please provide all required fields (title, file1, and file2) for a new upload."
        );
        return;
      }
    }

    uploadImages();
  };

  const resetForm = () => {
    setSelectedFiles({ file1: null, file2: null });
    setFormData({ title: "", price: "", paragraph: "", selectOptions: [] });
    setUploadProgress(0);
    setPosition(true);
  };

  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(function () {
      setOpenForm(false);
      setClosing(false);
    }, 500);
    if (editedGlooya) {
      setClosing(true);
      setTimeout(function () {
        setEditedGlooya?.(undefined);
        setClosing(false);
      }, 500);
    }
    resetForm();
  };

  return (
    <div className={`form-wrapper ${closing && "close-form-anim"}`}>
      {!isUploading ? (
        <>
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
          <div className="form-form">
            <form onSubmit={handleSubmit}>
              <div className="form">
                <div className="form-left form-column">
                  <MyInput
                    name="title"
                    onChange={handleChange}
                    value={formData.title}
                    isRequired
                  />
                  <MyInput
                    name="price"
                    onChange={handleChange}
                    value={formData.price}
                    isRequired
                  />
                  <MyInput
                    name="paragraph"
                    onChange={handleChange}
                    value={formData.paragraph}
                    isRequired
                  />
                </div>
                <div className="form-right form-column">
                  <div className="z">
                    <CreatableSelect
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      placeholder="Select Tags"
                      isMulti
                      options={options}
                      onChange={handleTagChange}
                      defaultValue={
                        editedGlooya ? editedGlooya.selectOptions : undefined
                      }
                    />
                  </div>

                  <div className="form-files">
                    <div className="file-container">
                      <label htmlFor="file1">Front Image</label>
                      <input
                        className="file"
                        type="file"
                        onChange={handleFileChange("file1")}
                        id="file1"
                      />
                    </div>

                    <div className="file-container">
                      <label htmlFor="file2">Back Image</label>
                      <input
                        className="file"
                        type="file"
                        onChange={handleFileChange("file2")}
                        id="file2"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="posiotions">
                <div
                  className={`position ${!position && "on"}`}
                  onClick={() => {
                    setPosition(true);
                  }}
                >
                  <div className="vertical"></div>
                </div>
                <div
                  className={`position ${position && "on"}`}
                  onClick={() => {
                    setPosition(false);
                  }}
                >
                  <div className="horizontal"></div>
                </div>
              </div>
              <button type="submit" className="submit-form">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#1f1f1f"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                </svg>
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="uploading">
          <p>Uploading...</p>
          <progress value={uploadProgress} max={100} />
        </div>
      )}
    </div>
  );
};

export default Form;
