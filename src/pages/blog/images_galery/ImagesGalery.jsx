import React, { useState, useEffect } from "react";
import "./ImagesGalery.scss";
import LeftBar from "./leftbar/LeftBar";
import CreateYear from "./create_category/CreateYear";
import CreatePhoto from "./create_image/CreatePhoto";
import Content from "./content/Content";
import { ImagesContext } from "../../../context/ImagesContext";

const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;

const ImagesGalery = (props) => {
  const [categories, setCategories] = useState([]); // fetch and list all categories
  const [hideImages, setHideImages] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [value, setValue] = useState([]); // useContext
  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(1);

  const [filteredImages, setFilteredImages] = useState([])
  const [totalImagesCount, setTotalImagesCount] = useState(0)

  const getCategories = async (arg) => {
    let response
    if (arg === "dessins") {
      response = await fetch(`${BASE_URL}/api/v1/dessin_categories`, {
        method: "GET",
      });
    } else if ( arg === "paysages"){
      response = await fetch(`${BASE_URL}/api/v1/paysage_categories`, {
        method: "GET",
      });
    }
    const data = await response.json();
    console.log("1111")
    console.log(response)
    console.log(data)
    setCategories(data);
    if (data.length > 0) {
      setSelectedCategory(data[0].title);
    }
  };

  const getAllImages = async (arg) => {
    let response
    if (arg === "dessins") {
      response = await fetch(`${BASE_URL}/api/v1/getAllDessins`);
    } else if (arg === "paysages") {
      response = await fetch(`${BASE_URL}/api/v1/getAllPaysages`);
    }
    
    const data = await response.json();
    setValue(data);
  };

  const displaySelectedCategory = (cateTitle) => {
    setSelectedCategory(cateTitle);
  };






  const imagesFilter = (initialData) => {
    console.log("FILTER That BUGS")
    console.log("FILTER That BUGS")
    console.log(initialData)
    console.log(props.arg)

    console.log("FILTER That BUGS")
    console.log("FILTER That BUGS")

    // select the category
    if (hideImages === false && initialData.length > 0) {
      // small filter
      const filteredCategory = filterCategory(initialData);
      const initializedImagesReader = initImagesReader(filteredCategory);
      setFilteredImages(sliceDataForPagination(initializedImagesReader))
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
      setFilteredImages(sliceDataForPagination(initializedImagesHiding))
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
      if (props.arg === "dessins") {
        return {
          ...cate,
          dessins: cate.dessins.map((img) => {
            if (img.has_to_be_displayed === true) {
              count += 1;
            }
        
            return {
              ...img,
              customIndex: count,
            };
          }),
        };
      } else if (props.arg === "paysages") {
        return {
          ...cate,
          paysages: cate.paysages.map((img) => {
            if (img.has_to_be_displayed === true) {
              count += 1;
            }
            return {
              ...img,
              customIndex: count,
            };
          }),
        };
      }
      
    });

    console.log('FILLTER')
    console.log('FILLTER')
    console.log('FILLTER')
    console.log(count)
    console.log('FILLTER')
    console.log('FILLTER')
    setTotalImagesCount(count)

    return filteredArray;
  };

  const sliceDataForPagination = (array) => {
    let filteredArray = array.map((cate) => {
      if (props.arg === "dessins") {
        return {
          ...cate,
          dessins: cate.dessins.slice(0, currentPaginationIndex * 20),
        };
      } else if (props.arg === "paysages") {
        return {
          ...cate,
          paysages: cate.paysages.slice(0, currentPaginationIndex * 20),
        };
      }
      
    });
    return filteredArray;
  };

  const addDisplayedAttributeToImages = (array) => {
    let filteredArray = array.map((cate) => {
      if (props.arg === "dessins"){
        return {
          ...cate,
          dessins: cate.dessins.filter((img) => img.has_to_be_displayed === true),
        };
      } else if (props.arg === "paysages"){
        return {
          ...cate,
          paysages: cate.paysages.filter((img) => img.has_to_be_displayed === true),
        };
      }
   
    });
    return filteredArray;
  };



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

 
  // séquence filter
  useEffect(() => {
    imagesFilter(value);
 }, [value])

  useEffect(() => {
    imagesFilter(value)
  },[selectedCategory])


  useEffect(() => {
    getCategories(props.arg);
    getAllImages(props.arg);
  },[props.arg])

  useEffect(()=>{
    imagesFilter(value)
  },[hideImages])


  console.log("IMAGE GALERY")
  console.log("IMAGE GALERY")
  console.log("IMAGE GALERY")
  console.log(props.arg)
  console.log(filteredImages)
  console.log(totalImagesCount)
  console.log("IMAGE GALERY")
  console.log("IMAGE GALERY")
  console.log("IMAGE GALERY")


  return (
    <>
      <ImagesContext.Provider value={{ value, setValue }}>
        <div className="bd-container">
          <LeftBar
            categories={categories}
            setHideImages={setHideImages}
            hideImages={hideImages}
            displaySelectedCategory={displaySelectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          <CreateYear arg={props.arg} categories={categories} />
          <CreatePhoto arg={props.arg} categories={categories}  />

          <Content
            arg={props.arg}
            totalImagesCount={totalImagesCount}
            images={filteredImages}
            selectedCategory={selectedCategory}
            paginateForward={paginateForward}
          />
        </div>
      </ImagesContext.Provider>
    </>
  );
};
export default ImagesGalery;
