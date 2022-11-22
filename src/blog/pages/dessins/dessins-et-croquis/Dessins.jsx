import React, { useState, useEffect, useContext, useMemo } from "react";
import "./Dessins.scss";
import LeftBar from "./LeftBar";
import CreateYear from "./CreateYear";
import CreatePhoto from "./CreatePhoto";
import Content from "./Content";
import { DessinsContext } from "./DessinsContext";
import { LoginContext } from "../../../../authentication/LoginContext";
import NewComponent from "./NewComponent";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
//const LazyContent = React.lazy(()=>import('./Content'))

const Dessins = () => {
  const [categories, setCategories] = useState([]); // fetch and list all categories
  const [hideImages, setHideImages] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [value, setValue] = useState([]); // useContext

  const getCategories = async () => {
    const response = await fetch(`${BASE_URL}/api/v1/dessin_categories`, {
      method: "GET",
    });
    const data = await response.json();
    setCategories(data);
    if (data.length > 0) {
      setSelectedCategory(data[0].title);
    }
  };

  const getAllImages = async () => {
    const response = await fetch(`${BASE_URL}/api/v1/getAllDessins`);
    const data = await response.json();
    setValue(data);
  };

  const displaySelectedCategory = (cateTitle) => {
    setSelectedCategory(cateTitle);
  };

  useEffect(() => {
    // initialization
    getCategories();
    getAllImages();
  }, []);

  let imagesFilteredByCategory = value.filter((cate) => {
    return cate.title === selectedCategory;
  });

  let filteredImages = [];

  if (hideImages === false && value.length > 0) {
    filteredImages = imagesFilteredByCategory;
  } else if (hideImages === true && value.length > 0) {
    filteredImages = imagesFilteredByCategory.map((cate) => {
      return {
        ...cate,
        dessins: cate.dessins.filter((img) => img.has_to_be_displayed === true),
      };
    });
  }
  let count = 0;
  filteredImages = filteredImages.map((cate) => {
    return {
      ...cate,
      dessins: cate.dessins.map((img) => {
        count += 1;
        return {
          ...img,
          customIndex: count,
        };
      }),
    };
  });

  let totalImagesCount = count || 0;

  // filtre pagination
  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(1);
  // sera remis a zero a chaque cgt de catégorie

  let finalImagesFilteredArray = [];
  if (filteredImages.length > 0 && hideImages === true) {
    filteredImages = filteredImages.map((cate) => {
      return {
        ...cate,
        dessins: cate.dessins.slice(0, currentPaginationIndex * 20),
      };
    });
  }

  const paginateForward = () => {
    setCurrentPaginationIndex(currentPaginationIndex + 1);
  };

  useEffect(() => {
    //fetchImages();
    window.addEventListener("scroll", handleScroll); // attaching scroll event listener
  }, [currentPaginationIndex]);

  const handleScroll = () => {
    let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;
    if (userScrollHeight >= windowBottomHeight - 25) {
      setCurrentPaginationIndex(currentPaginationIndex + 1);
    }
  };

  return (
    <>
      <DessinsContext.Provider value={{ value, setValue }}>
        <div className="bd-container">
          <LeftBar
            categories={categories}
            setHideImages={setHideImages}
            hideImages={hideImages}
            displaySelectedCategory={displaySelectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          <CreateYear />
          <CreatePhoto />

          <Content
            totalImagesCount={totalImagesCount}
            images={filteredImages}
            selectedCategory={selectedCategory}
            paginateForward={paginateForward}
          />
        </div>
      </DessinsContext.Provider>
    </>
  );
};
export default Dessins;
