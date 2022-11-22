import React, { useState, useEffect, useContext , useMemo} from "react";
import "./Dessins.scss";
import LeftBar from "./LeftBar";
import CreateYear from "./CreateYear";
import CreatePhoto from "./CreatePhoto";
import Content from "./Content";
import { DessinsContext } from "./DessinsContext"
import { LoginContext } from "../../../../authentication/LoginContext"
import NewComponent from "./NewComponent"
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN
//const LazyContent = React.lazy(()=>import('./Content'))


const Dessins = () => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [unhideImages, setUnhideImages] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [value, setValue] = useState([]) // useContext



  const getCategories = async () => {
    const response = await fetch(
      `${BASE_URL}/api/v1/dessin_categories`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setCategories(data);
    if (data.length > 0) {
      setSelectedCategory(data[0].title);
    }
  };

  const getAllImages = async () => {
    const response = await fetch(`${BASE_URL}/api/v1/getAllDessins`);
    const data = await response.json();
    setImages(data);

  };

  const displaySelectedCategory = (cateTitle) => {
    console.log("displaydselectedcate")
    //moveToDiv(cateTitle)
    setSelectedCategory(cateTitle);
  }

  function moveToDiv(cateTitle) {
    let arrivalElement
    for (let i = 0; i < images.length; i++){
      if (images[i].title === cateTitle) {
        arrivalElement = document.querySelector(`.bd-images-grid.${cateTitle}`)
      }
    }
    let distanceFromTop = arrivalElement.getBoundingClientRect().top
    window.scrollTo({
      top: distanceFromTop - 75 - 75 + window.scrollY,
      behavior: "smooth"
    })
  }

  useEffect(() => {
    getCategories();
    getAllImages()
     
  }, []);

  useEffect(() => {
    console.log("request to unhide images has been sent");
  }, [unhideImages]);

  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  console.log('FROMMMMMMMMM DESSSINS.JSX FROMMMMMMMMMMMM')
  console.log(value)
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

  let imagesFilteredByCategory = value.filter((cate) => {
    console.log('hi')
    console.log(cate.title)
    console.log(selectedCategory)
    return cate.title === selectedCategory
  })

  let filteredImages = [];
  
  if (unhideImages === true && value.length > 0) {
    filteredImages = imagesFilteredByCategory;
  } else if (unhideImages === false && value.length > 0) {
    filteredImages = imagesFilteredByCategory.map((cate) => {
      console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
      console.log(cate)
      console.log(cate.dessins)
      console.log()
      return {
        ...cate,
        dessins: cate.dessins.filter((img) => img.has_to_be_displayed === true),
      };
    });
  }
  let count = 0
  filteredImages = filteredImages.map((cate) => {
    
    return {
      ...cate,
      dessins: cate.dessins.map((img) => {
        count += 1
        return {
          ...img,
          customIndex: count
        }
      })
    }
  })

  let totalImagesCount = count || 0

  // filtre pagination
  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(1)
  // sera remis a zero a chaque cgt de catégorie


  let finalImagesFilteredArray = []
  if (filteredImages.length > 0 && unhideImages === false) {
 
    filteredImages = filteredImages.map((cate) => {
      return {...cate, dessins: cate.dessins.slice(0, (currentPaginationIndex*20)) }
    })
  }


  function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }


    // déclaration du contexte


  const providerValue = useMemo(()=>({value, setValue}), []) // only one time. // but cant make it work
  // will update only when the state changes

  useEffect(() => {
    setValue(images)
  },[images])
  
  const {isAuth, setIsAuth} = useContext(LoginContext)

  console.log("::::::::::::::::::::")
  console.log("::::::::::::::::::::")
  console.log("::::::::::::::::::::")
  console.log("dessins.jsx")
  console.log(isAuth)
  console.log("::::::::::::::::::::")
  console.log("::::::::::::::::::::")


  const paginateForward = () => {
    setCurrentPaginationIndex(currentPaginationIndex+1)
  }

  useEffect(() => {
    //fetchImages();
        window.addEventListener("scroll", handleScroll); // attaching scroll event listener
  }, []);
  useEffect(() => {
    //fetchImages();
        window.addEventListener("scroll", handleScroll); // attaching scroll event listener
  }, [currentPaginationIndex]);

  const handleScroll = () => {
    let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;
    console.log('88888888888888888888888888888888')
    console.log('88888888888888888888888888888888')
    console.log(userScrollHeight)
    console.log(windowBottomHeight)
    console.log('88888888888888888888888888888888')
    console.log('88888888888888888888888888888888')
    if (userScrollHeight >= windowBottomHeight ) {
    //fetchImages();
    setCurrentPaginationIndex(currentPaginationIndex+1)
    }
    };


  return (
    <>
      <DessinsContext.Provider value={{value, setValue}}>
      <div className="bd-container">

        <LeftBar
          categories={categories}
          setUnhideImages={setUnhideImages}
          unhideImages={unhideImages}
            displaySelectedCategory={displaySelectedCategory}
            setSelectedCategory={setSelectedCategory}
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
