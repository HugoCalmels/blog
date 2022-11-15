import { useState, useEffect } from "react";
import "./Dessins.scss";
import LeftBar from "./LeftBar";
import CreateYear from "./CreateYear";
import CreatePhoto from "./CreatePhoto";
import Content from "./Content";

const Dessins = () => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [unhideImages, setUnhideImages] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const getCategories = async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/dessin_categories",
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
    const response = await fetch(`http://localhost:3000/api/v1/getAllDessins`);
    const data = await response.json();
    setImages(data);
  };

  const scrollToElement = (cateTitle) => {
    moveToDiv(cateTitle)
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
    getAllImages();
  }, []);

  useEffect(() => {
    console.log("request to unhide images has been sent");
  }, [unhideImages]);

  let filteredImages = [];
  if (unhideImages === true && images.length > 0) {
    filteredImages = images;
  } else if (unhideImages === false && images.length > 0) {
    filteredImages = images.map((cate) => {
      return {
        ...cate,
        dessins: cate.dessins.filter((img) => img.has_to_be_displayed === true),
      };
    });
  }

  return (
    <>
      <div className="bd-container">

        <LeftBar
          categories={categories}
          setUnhideImages={setUnhideImages}
          unhideImages={unhideImages}
          scrollToElement={scrollToElement}
        />
        <CreateYear />
        <CreatePhoto />

 
       
          
          <Content

            images={filteredImages}
          />
 
      </div>
    </>
  );
};
export default Dessins;
