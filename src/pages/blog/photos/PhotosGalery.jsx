import React, { useState, useEffect , useRef} from "react";
import "./PhotosGalery.scss";
import LeftBar from "./leftbar/LeftBar";
import CreateYear from "./create_category/CreateYear";
import CreatePhoto from "./create_image/CreatePhoto";
import Content from "./content/Content";
import { ImagesContext } from "../../../context/ImagesContext";

import Footer from "../../../components/footer/Footer"
import TopBar from "./topbar/TopBar"
import { RxGear } from "react-icons/rx"
import Cookies from "js-cookie";
import Loader from "./Loader"
import {BsArrowDownCircle} from "react-icons/bs"
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;

const PhotosGalery = (props) => {
  const [isLoading, setIsLoading ] = useState(false)
  const [categories, setCategories] = useState([]); // fetch and list all categories
  const [hideImages, setHideImages] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryID, setSelectedCategoryID] = useState("")
  const [value, setValue] = useState([]); // useContext
  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(1);
  const leftBarTriggerBtnElem = useRef(null)
  const modalCreatePhoto = useRef(null);
  const modalCreateCate = useRef(null)
  const [isScrollable, setIsScrollable] = useState(true)
  const [filteredImages, setFilteredImages] = useState([]);
  const [totalImagesCount, setTotalImagesCount] = useState(0);
  const btnStyle = { color: "#424242", width: "25px", height: "25px" }
  const topBarElem = useRef(null)
  const leftBarElem = useRef(null)
  const contentWrapperRef = useRef(null)
  const [unpaginatedImages, setUnpaginatedImages] = useState([])
  const btnStyle2 = {backgroundColor: "rgba(250,250,250,.75)", borderRadius: "50%", shapeRendering: "solidGeometricPrecision",color: "#424242", width: "35px", height: "35px" }
  let cookieIsAuth = false;
  const cookie = Cookies.get("cie-lutin-isAuth");
  if (cookie !== undefined) {
    cookieIsAuth = JSON.parse(cookie);
  }
 const scrollToTopElem = useRef(null)
  const getCategories = () => {
    getCategoriesAPI().then((data) => {
      setCategories(data);
      if (data.length > 0) {
        setIsScrollable(true)
        setSelectedCategory(data[0].title);
        setSelectedCategoryID(data[0].id)
      }
    });
  };

  function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

  const getCategoriesAPI = async () => {
     const response = await fetch(`${BASE_URL}/api/v1/photo_categories`, {
        method: "GET",
      });
    
  const data = await response.json();
  return data
}



  const getAllImages = async () => {
    const response = await fetch(`${BASE_URL}/api/v1/getAllPhotos`);
    const data = await response.json();
    console.log("GET ALL PHOTOS !!!!!!!!")
    setValue(data);
  };



  const displaySelectedCategory = (cateTitle) => {
    setSelectedCategory(cateTitle);
    const foundCategory = value.filter(cate => cate.title === cateTitle)
    if (cateTitle === selectedCategory) {
      window.scrollTo({ top: '0px'});
    }
    setSelectedCategoryID(foundCategory[0].id)
  };

  const imagesFilter = (initialData) => {
    // select the category
    console.log("IMAGES FILTER 33333333333333333333333")
    console.log(initialData)
    console.log("IMAGES FILTER 33333333333333333333333333")
    if (hideImages === false && initialData.length > 0) {
      // small filter
      console.log('1111111111111111111111111')
      console.log('1111111111111111111111111')
      console.log(initialData)
      console.log('1111111111111111111111111')
      console.log('1111111111111111111111111')
      const filteredCategory = filterCategory(initialData);
      console.log('222222222222222222222222222')
      console.log('222222222222222222222222222')
      console.log(filteredCategory)
      console.log('222222222222222222222222222')
      console.log('222222222222222222222222222')
      const initializedImagesReader = initImagesReader(filteredCategory);
      console.log("333333333333333333333333333")
      console.log("333333333333333333333333333")
      console.log(initializedImagesReader)
      console.log("333333333333333333333333333")
      console.log("333333333333333333333333333")
      setFilteredImages(sliceDataForPagination(initializedImagesReader));
      setUnpaginatedImages(initializedImagesReader)
    } else if (hideImages === true && initialData.length > 0) {
      // same plus hide image system
      console.log("THE OTHER THING")
      console.log("THE OTHER THING")
      console.log(initialData)
      console.log("THE OTHER THING")

      console.log("THE OTHER THING")
      const filteredCategory = filterCategory(initialData);

      const initializedImagesReader = initImagesReader(filteredCategory);
      const initializedImagesHiding = addDisplayedAttributeToImages(
        initializedImagesReader
      );
      setFilteredImages(sliceDataForPagination(initializedImagesHiding));
      setUnpaginatedImages(initializedImagesHiding)
    }
  };

  const filterCategory = (array) => {
    let filteredArray = array.filter((cate) => {
      return cate.title === selectedCategory;
    });
    return filteredArray;
  };

  const initImagesReader = (array) => {
    console.log("????????????????????????????")
    console.log("????????????????????????????")
    console.log(array)
    console.log("????????????????????????????")
    console.log("????????????????????????????")
    let count = 0;
    let filteredArray = array.map((cate) => {
      return {
        ...cate,
        photos: cate.photos.map((img) => {
          if (img.has_to_be_displayed === true) {
            count += 1;
          }

          return {
            ...img,
            customIndex: count,
          };
        }),
      };
    });

    setTotalImagesCount(count);

    return filteredArray;
  };

  const sliceDataForPagination = (array) => {
    let filteredArray = array.map((cate) => {
      return {
        ...cate,
        photos: cate.photos.slice(0, currentPaginationIndex * 9),
      };
    });
    console.log("))))))))))))))))))))))")
    console.log("))))))))))))))))))))))")
    console.log(props.arg)
    console.log(array)
    console.log(filteredArray)
    console.log("))))))))))))))))))))))")
    console.log("))))))))))))))))))))))")
    console.log("))))))))))))))))))))))")
    return filteredArray;
  };

  const addDisplayedAttributeToImages = (array) => {
    let filteredArray = array.map((cate) => {
      return {
        ...cate,
        photos: cate.photos.filter(
          (img) => img.has_to_be_displayed === true
        ),
      };
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

    console.log("???")
    console.log(userScrollHeight)
    console.log(windowBottomHeight)
    if (userScrollHeight >= windowBottomHeight - 25) {
      setCurrentPaginationIndex(currentPaginationIndex + 1);
    }
  };

  // séquence filter
  useEffect(() => {
    console.log('HOW IS THE VALUE')
    console.log(value)
    imagesFilter(value);
  }, [value]);

  useEffect(() => {
    console.log("SELECTED CATEGORY")
    console.log(value)

    getAllImages(props.arg).then(() => {
 
    })
    console.log("??EZEZFZ")

    if (leftBarTriggerBtnElem.current && topBarElem.current){
      //leftBarTriggerBtnElem.current.style.top = `calc(75px + ${topBarElem.current.offsetHeight}px + 30px)`
    }
    //documentElement.scrollTo(75+30+topBarElem.current.offsetHeight)
    if (contentWrapperRef.current) {
     // contentWrapperRef.current.scrollIntoView();
    }

  }, [selectedCategory]);

  useEffect(() => {
    setIsLoading(true)
    getCategories(props.arg);
    getAllImages(props.arg).then(() => {
      setIsLoading(false)
    })
  },[])

  useEffect(() => {
    console.log("ARG CHANGED WHEN DO YOU READ THAT")
    setIsScrollable(false)
    console.log(props.arg)
 
    getCategories(props.arg);
    getAllImages(props.arg).then(() => {
   
    })
    closeModals()
    setCurrentPaginationIndex(1)
  }, [props.arg]);

  const closeModals = () => {
    modalCreatePhoto.current.classList.remove("active")
    modalCreateCate.current.classList.remove("active")
    closeLeftBar()
  }

  useEffect(() => {
    console.log("HIDE IMAGES")
    console.log(value)
    imagesFilter(value);
  }, [hideImages]);


  const openLeftBar = (e) => {
    e.preventDefault();
    console.log('hji')
    leftBarElem.current.classList.add("active")
    leftBarTriggerBtnElem.current.classList.add("inactive")
  }
  const closeLeftBar = (e) => {
    //e.preventDefault();
    if (leftBarElem.current && leftBarTriggerBtnElem.current) {
      leftBarElem.current.classList.remove("active")
      leftBarTriggerBtnElem.current.classList.remove("inactive")
    }

  }
const loaderElem = useRef(null)

  useEffect(() => {
    console.log("LOADER TRIGGERED")
    console.log("LOADER TRIGGERED")
    console.log("LOADER TRIGGERED")
    if(isLoading ) {
      loaderElem.current.classList.add('active')
    } else {
      loaderElem.current.classList.remove('active')
    }

  },[isLoading])

  useEffect(() => {
    closeLeftBar()
    setCurrentPaginationIndex(1)
  },[ props.arg])

  useEffect(() => {
    console.log("from index")
    console.log(filteredImages)
  },[filteredImages])

  console.log("once index gain")
  console.log(value)
  console.log(filteredImages)
  console.log(currentPaginationIndex)

  useEffect(() => {
    if (isScrollable) {
      imagesFilter(value)
    }

  },[currentPaginationIndex])

  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
  console.log(value)
  console.log(filteredImages)
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")

  return (
    <>
      <ImagesContext.Provider value={{ value, setValue }}>
     
        <main className="b-main-wrapper">
        <Loader loaderElem={loaderElem} />
        <div className="scroll-to-top-btn-small-container-wrapper">
        
            <div className="scroll-to-top-btn-small-2-container active"  ref={scrollToTopElem}  onClick={scrollToTop}>
      <BsArrowDownCircle style={btnStyle2} />
      </div>
      </div>  
          <TopBar
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            displaySelectedCategory={displaySelectedCategory}
            topBarElem={topBarElem}
          />

          {cookieIsAuth === true ? 
            <>
            <div className="bd-left-bar-trigger-btn" ref={leftBarTriggerBtnElem} onClick={(e)=>openLeftBar(e)}>
                  <h5>Paramètres</h5>
                   <RxGear style={btnStyle} />
              </div>
              <LeftBar
                closeLeftBar={closeLeftBar}
                leftBarElem={leftBarElem}
            topBarElem={topBarElem}
            categories={categories}
            setHideImages={setHideImages}
            hideImages={hideImages}
            displaySelectedCategory={displaySelectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
            </>
           
            :
            <></>
          }
          
          <CreateYear arg={props.arg} categories={categories} modalCreateCate={modalCreateCate} />
          <CreatePhoto arg={props.arg} categories={categories} selectedCategory={selectedCategory} setIsLoading={setIsLoading} selectedCategoryID={selectedCategoryID} modalCreatePhoto={modalCreatePhoto} />

          <Content
            unpaginatedImages={unpaginatedImages}
            scrollToTopElem={scrollToTopElem}
            contentWrapperRef={contentWrapperRef}
            setIsLoading={setIsLoading}
            topBarElem={topBarElem}
            arg={props.arg}
            totalImagesCount={totalImagesCount}
            images={filteredImages}
            selectedCategory={selectedCategory}
            paginateForward={paginateForward}
            leftBarTriggerBtnElem={leftBarTriggerBtnElem}
          />
        </main>
     
      </ImagesContext.Provider>
    </>
  );
};
export default PhotosGalery;
