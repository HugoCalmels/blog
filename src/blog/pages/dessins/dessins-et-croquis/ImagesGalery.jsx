import React, { useState, useEffect } from "react";
import "./ImagesGalery.scss";
import LeftBar from "./LeftBar";
import CreateYear from "./CreateYear";
import CreatePhoto from "./CreatePhoto";
import Content from "./Content";
import { DessinsContext } from "./DessinsContext";

const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;
//const LazyContent = React.lazy(()=>import('./Content'))

const ImagesGalery = (props) => {
  const [categories, setCategories] = useState([]); // fetch and list all categories
  const [hideImages, setHideImages] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [value, setValue] = useState([]); // useContext
  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(1);
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

  let filteredImages = [];
  let totalImagesCount = 0;

  const imagesFilter = (initialData) => {
    // select the category
    if (hideImages === false && initialData.length > 0) {
      // small filter
      const filteredCategory = filterCategory(initialData);
      const initializedImagesReader = initImagesReader(filteredCategory);
      filteredImages = sliceDataForPagination(initializedImagesReader);
    } else if (hideImages === true && initialData.length > 0) {
      // same plus hide image system
      console.log("---");
      console.log(initialData);
      const filteredCategory = filterCategory(initialData);
      console.log(filteredCategory);
      const initializedImagesReader = initImagesReader(filteredCategory);
      const initializedImagesHiding = addDisplayedAttributeToImages(
        initializedImagesReader
      );
      filteredImages = sliceDataForPagination(initializedImagesHiding);
    }
  };

  const filterCategory = (array) => {
    let filteredArray = array.filter((cate) => {
      return cate.title === selectedCategory;
    });
    return filteredArray;
  };

  const initImagesReader = (array) => {
    let count = 0;
    let filteredArray = array.map((cate) => {
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

    totalImagesCount = count;
    return filteredArray;
  };

  const sliceDataForPagination = (array) => {
    let filteredArray = array.map((cate) => {
      return {
        ...cate,
        dessins: cate.dessins.slice(0, currentPaginationIndex * 20),
      };
    });
    return filteredArray;
  };

  const addDisplayedAttributeToImages = (array) => {
    let filteredArray = array.map((cate) => {
      return {
        ...cate,
        dessins: cate.dessins.filter((img) => img.has_to_be_displayed === true),
      };
    });
    return filteredArray;
  };

  // séquence filter
  imagesFilter(value);

  const paginateForward = () => {
    setCurrentPaginationIndex(currentPaginationIndex + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [currentPaginationIndex]);

  const handleScroll = () => {
    let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;
    if (userScrollHeight >= windowBottomHeight - 25) {
      setCurrentPaginationIndex(currentPaginationIndex + 1);
    }
  };

  console.log(props.arg)

  useEffect(() => {
    console.log(props.arg)
  },[props.arg])

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
export default ImagesGalery;
