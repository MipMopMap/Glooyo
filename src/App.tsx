import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { FormSelector, Glooyot } from "./containers";
import { getDocs, collection } from "firebase/firestore";
import { OpenImage, SideMenu, TopNav } from "./components";
import useScroll from "./hooks/useScroll";
import useDeleteDocument from "./hooks/useDeleteDocument";
import useFirebase from "./hooks/useFirebase";

function App() {
  const { db, storage } = useFirebase();
  const { scroll, scrollableDivRef } = useScroll();
  const [data, setData] = useState<any[]>([]);

  const handleDeleteDocument = useDeleteDocument(db, storage, data, setData);
  const [queryString, setQueryString] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [editedGlooya, setEditedGlooya] = useState<{
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
  }>();
  const [options, setOptions] = useState<
    {
      [x: string]: any;
    }[]
  >();

  const fetchData = useCallback(async () => {
    if (!db) return;
    const querySnapshot = await getDocs(collection(db, "glooyaData"));
    const tags = await getDocs(collection(db, "tags"));

    const fetchedTags = tags.docs.map((doc) => {
      const data = doc.data();
      return data.selectOptions;
    });
    setOptions(fetchedTags[0]);

    const fetchedData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(fetchedData);
  }, [db]);

  useEffect(() => {
    fetchData();
  }, [fetchData, db]);

  useEffect(() => {
    fetchData();
  }, [db, fetchData]);

  const handleSortBy = (field: string, order: string) => {
    const sortedData = [...data].sort((a, b) => {
      if (order === "asc") {
        return a[field] - b[field];
      } else if (order === "desc") {
        return b[field] - a[field];
      }
      return 0;
    });

    setData(sortedData);
  };

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setQueryString(e.target.value);
  };

  const lowerCaseQuery = queryString.toLowerCase();
  const GLOOYOT_FILTERED = data.filter((glooya) => {
    const lowerCaseTitle = glooya.title.toLowerCase();
    const lowerCaseParagraph = glooya.paragraph.toLowerCase();
    const matchedTags = glooya.selectOptions?.some(
      (option: { value: string }) =>
        option.value.toLowerCase().includes(lowerCaseQuery)
    );

    return (
      lowerCaseTitle.includes(lowerCaseQuery) ||
      lowerCaseParagraph.includes(lowerCaseQuery) ||
      matchedTags
    );
  });

  const scrollToTop = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = 0;
    }
  };

  const [openImage, setOpenImage] = useState();

  return (
    <div className={`App \${isRTL ? "rtl" : ""}`}>
      <div className="body">
        <SideMenu
          setOpenForm={setOpenForm}
          handleSortBy={handleSortBy}
          scrollToTop={scrollToTop}
          isRTL={isRTL}
          setIsRTL={setIsRTL}
        />
        <div className="content">
          <FormSelector
            editedGlooya={editedGlooya}
            setEditedGlooya={setEditedGlooya}
            openForm={openForm}
            setOpenForm={setOpenForm}
            db={db}
            storage={storage}
            setData={setData}
            fetchData={fetchData}
            setOptions={setOptions}
            options={options}
          />
          {openImage && (
            <OpenImage openImage={openImage} setOpenImage={setOpenImage} />
          )}
          <TopNav
            scroll={scroll}
            handleInputChange={handleInputChange}
            isRTL={isRTL}
            queryString={queryString}
            options={options}
          />
          <div>
            {data && (
              <Glooyot
                data={GLOOYOT_FILTERED}
                deleteID={handleDeleteDocument}
                setEditedGlooya={setEditedGlooya}
                scrollableDivRef={scrollableDivRef}
                setOpenImage={setOpenImage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
