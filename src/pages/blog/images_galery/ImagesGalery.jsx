import React, { useState, useEffect, useRef } from "react";
import "./ImagesGalery.scss";
import LeftBar from "./leftbar/LeftBar";
import CreateYear from "./create_category/CreateYear";
import CreatePhoto from "./create_image/CreatePhoto";
import Content from "./content/Content";
import { ImagesContext } from "../../../context/ImagesContext";
import { getCategoriesAPI } from "../../../features/images/getCategoriesAPI";
import Footer from "../../../components/footer/Footer";
import TopBar from "./topbar/TopBar";
import { RxGear } from "react-icons/rx";
import Cookies from "js-cookie";
import Loader from "./Loader";
import { BsArrowDownCircle } from "react-icons/bs";
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN;

const ImagesGalery = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]); // fetch and list all categories
  const [hideImages, setHideImages] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryID, setSelectedCategoryID] = useState("");
  const [value, setValue] = useState([]); // useContext
  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(1);
  const leftBarTriggerBtnElem = useRef(null);
  const modalCreatePhoto = useRef(null);
  const modalCreateCate = useRef(null);
  const [isScrollable, setIsScrollable] = useState(true);
  const [filteredImages, setFilteredImages] = useState([]);
  const [totalImagesCount, setTotalImagesCount] = useState(0);
  const btnStyle = { color: "#424242", width: "25px", height: "25px" };
  const topBarElem = useRef(null);
  const leftBarElem = useRef(null);
  const contentWrapperRef = useRef(null);
  const btnStyle2 = {
    backgroundColor: "rgba(250,250,250,.75)",
    borderRadius: "50%",
    shapeRendering: "solidGeometricPrecision",
    color: "#424242",
    width: "35px",
    height: "35px",
  };
  let cookieIsAuth = false;
  const scrollToTopElem = useRef(null);
  const cookie = Cookies.get("cie-lutin-isAuth");
  const [unpaginatedImages, setUnpaginatedImages] = useState([]);
  if (cookie !== undefined) {
    cookieIsAuth = JSON.parse(cookie);
  }

  const getCategories = (arg) => {
    getCategoriesAPI(arg).then((data) => {
      setCategories(data);
      if (data.length > 0) {
        setIsScrollable(true);
        setSelectedCategory(data[0].title);
        setSelectedCategoryID(data[0].id);
      }
    });
  };

  const getAllImages = async (arg) => {
    let response;
    if (arg === "dessins") {
      response = await fetch(`${BASE_URL}/api/v1/getAllDessins`);
    } else if (arg === "paysages") {
      response = await fetch(`${BASE_URL}/api/v1/getAllPaysages`);
    } else if (arg === "carnets") {
      response = await fetch(`${BASE_URL}/api/v1/getAllCarnets`);
    }

    const data = await response.json();
    setValue(data);
  };

  const displaySelectedCategory = (cateTitle) => {
    setSelectedCategory(cateTitle);
    const foundCategory = value.filter((cate) => cate.title === cateTitle);
    if (cateTitle === selectedCategory) {
      window.scrollTo({ top: "0px" });
    }
    setSelectedCategoryID(foundCategory[0].id);
  };

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const imagesFilter = (initialData) => {
    // select the category
    if (hideImages === false && initialData.length > 0) {
      // small filter

      const filteredCategory = filterCategory(initialData);

      const initializedImagesReader = initImagesReader(filteredCategory);

      setFilteredImages(sliceDataForPagination(initializedImagesReader));
      setUnpaginatedImages(initializedImagesReader);
    } else if (hideImages === true && initialData.length > 0) {
      // same plus hide image system

      const filteredCategory = filterCategory(initialData);

      const initializedImagesReader = initImagesReader(filteredCategory);
      const initializedImagesHiding = addDisplayedAttributeToImages(
        initializedImagesReader
      );
      setFilteredImages(sliceDataForPagination(initializedImagesHiding));
      setUnpaginatedImages(initializedImagesHiding);
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
      } else if (props.arg === "carnets") {
        return {
          ...cate,
          carnets: cate.carnets.map((img) => {
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

    setTotalImagesCount(count);

    return filteredArray;
  };

  const sliceDataForPagination = (array) => {
    let filteredArray = array.map((cate) => {
      if (props.arg === "dessins") {
        return {
          ...cate,
          dessins: cate.dessins.slice(0, currentPaginationIndex * 9),
        };
      } else if (props.arg === "paysages") {
        return {
          ...cate,
          paysages: cate.paysages.slice(0, currentPaginationIndex * 9),
        };
      } else if (props.arg === "carnets") {
        return {
          ...cate,
          carnets: cate.carnets.slice(0, currentPaginationIndex * 9),
        };
      }
    });

    return filteredArray;
  };

  const addDisplayedAttributeToImages = (array) => {
    let filteredArray = array.map((cate) => {
      if (props.arg === "dessins") {
        return {
          ...cate,
          dessins: cate.dessins.filter(
            (img) => img.has_to_be_displayed === true
          ),
        };
      } else if (props.arg === "paysages") {
        return {
          ...cate,
          paysages: cate.paysages.filter(
            (img) => img.has_to_be_displayed === true
          ),
        };
      } else if (props.arg === "carnets") {
        return {
          ...cate,
          carnets: cate.carnets.filter(
            (img) => img.has_to_be_displayed === true
          ),
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
  }, [value]);

  useEffect(() => {
    setIsLoading(true);
    getCategories(props.arg);
    getAllImages(props.arg).then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getAllImages(props.arg).then(() => {});

    setCurrentPaginationIndex(1);
    if (leftBarTriggerBtnElem.current && topBarElem.current) {
      // leftBarTriggerBtnElem.current.style.top = `calc(75px + ${topBarElem.current.offsetHeight}px + 30px)`
    }
    //documentElement.scrollTo(75+30+topBarElem.current.offsetHeight)
    if (contentWrapperRef.current) {
      // contentWrapperRef.current.scrollIntoView();
    }
  }, [selectedCategory]);

  useEffect(() => {
    setIsScrollable(false);

    getCategories(props.arg);
    getAllImages(props.arg).then(() => {});
    closeModals();
    setCurrentPaginationIndex(1);
  }, [props.arg]);

  const closeModals = () => {
    modalCreatePhoto.current.classList.remove("active");
    modalCreateCate.current.classList.remove("active");
    closeLeftBar();
  };

  useEffect(() => {
    imagesFilter(value);
  }, [hideImages]);

  const openLeftBar = (e) => {
    e.preventDefault();

    leftBarElem.current.classList.add("active");
    leftBarTriggerBtnElem.current.classList.add("inactive");
  };
  const closeLeftBar = (e) => {
    //e.preventDefault();
    if (leftBarElem.current && leftBarTriggerBtnElem.current) {
      leftBarElem.current.classList.remove("active");
      leftBarTriggerBtnElem.current.classList.remove("inactive");
    }
  };
  const loaderElem = useRef(null);

  useEffect(() => {
    if (isLoading) {
      loaderElem.current.classList.add("active");
    } else {
      loaderElem.current.classList.remove("active");
    }
  }, [isLoading]);

  useEffect(() => {
    closeLeftBar();
    setCurrentPaginationIndex(1);
  }, [props.arg]);

  useEffect(() => {}, [filteredImages]);

  useEffect(() => {
    if (isScrollable) {
      imagesFilter(value);
    }
  }, [currentPaginationIndex]);

  return (
    <>
      <ImagesContext.Provider value={{ value, setValue }}>
        <main className="b-main-wrapper">
          <Loader loaderElem={loaderElem} />

          <div className="scroll-to-top-btn-small-container-wrapper">
            <div
              className="scroll-to-top-btn-small-container active"
              ref={scrollToTopElem}
              onClick={scrollToTop}
            >
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

          {cookieIsAuth === true ? (
            <>
              <div
                className="bd-left-bar-trigger-btn"
                ref={leftBarTriggerBtnElem}
                onClick={(e) => openLeftBar(e)}
              >
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
          ) : (
            <></>
          )}

          <CreateYear
            arg={props.arg}
            categories={categories}
            modalCreateCate={modalCreateCate}
          />
          <CreatePhoto
            arg={props.arg}
            categories={categories}
            selectedCategory={selectedCategory}
            setIsLoading={setIsLoading}
            selectedCategoryID={selectedCategoryID}
            modalCreatePhoto={modalCreatePhoto}
          />

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
export default ImagesGalery;
