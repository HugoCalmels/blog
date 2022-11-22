import "./Content.scss"
import Masonry from 'react-masonry-css'
import { useEffect, useState, useContext } from "react";
import ImagesReader from "./ImagesReader"
import EditPhoto from "./EditPhoto"
import {DessinsContext} from "./DessinsContext"
import deleteIcon from "../../../../assets/icons/deleteIcon.png"
import hideIcon from "../../../../assets/icons/hideIcon.png"
import editIcon from "../../../../assets/icons/editIcon.png"
import Cookies from "js-cookie";
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
const BASE_URL = process.env.REACT_APP_PROD_BACK_DOMAIN
const Content = (props) => {
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedImageCategory, setSelectedImageCategory] = useState([])

  const [content, setContent] = useState([])

  const [defaultCustomIndex,setDefaultCustomIndex] = useState("")

  const [defaultArrayAndIndex, setDefaultArrayAndIndex] = useState({
    category: [],
    imageIndex: '',
    arrayIndex: ''
  })

  const [editSelectedImage, setEditSelectedImage] = useState("")
  const [editSelectedCategory, setEditSelectedCategory] = useState("")
  const  {value, setValue}  = useContext(DessinsContext)
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  useEffect(() => {
    console.log(props.selectedCategory)
  },[props.selectedCategory])
  const openImagesReader = (e,imageIndex,arrayIndex, category, customIndex) => {
    e.preventDefault();
    // can improve this using context // i want only the child comp to refresh but my usestate is here
    console.log("openImageReader is launched")
    const imagesReaderElem = document.querySelector('.bd-images-reader')
    imagesReaderElem.style.display = "flex"
    //setSelectedImage(image)

    console.log('000000000000000000000000000000000000000000000000')
    console.log('000000000000000000000000000000000000000000000000')
    console.log('000000000000000000000000000000000000000000000000')
    console.log("custom index:"+customIndex)
    console.log('000000000000000000000000000000000000000000000000')
    console.log('000000000000000000000000000000000000000000000000')
    console.log('000000000000000000000000000000000000000000000000')
    //setSelectedImageCategory(category)
    setDefaultArrayAndIndex({
      category: category,
      imageIndex: imageIndex,
      arrayIndex: arrayIndex
    })

    setDefaultCustomIndex(customIndex)
  }

  const tryToDestroyImage = (image, category) => {
    let answer = window.confirm("voulez vous détruire cette image ?")
    if (answer) {
      submitImageDestroyAPI(image, category)
    }
  }

  const submitImageDestroyAPI = async (image, category) => {
    const res = await fetch(`${BASE_URL}/api/v1/dessin_categories/${category.id}/dessins/${image.id}`, {
      method: "DELETE"
    })
    const data = await res.json();

    const newValue = value.map((category) => {
      return {
        ...category, dessins: category.dessins.filter((img) => {
        return image.id !== img.id
      })}
    })
    console.log("°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°")
    console.log("°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°")
    console.log(data)
    console.log(newValue)
    console.log("°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°")
    console.log("°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°")
    setValue(newValue)
    // window.location.reload(false)
  }

  const openEditModal = (image, category) => {
    document.querySelector('.bd-edit-photo').style.display = "flex"
    setEditSelectedImage(image)
    setEditSelectedCategory(category)
  }

  const handleHideImage = async (image, category) => {
    let newBoolean
    if (image.has_to_be_displayed === true) {
      newBoolean = false
    } else {
      newBoolean = true
    }
    const body = {
      dessin: {
        has_to_be_displayed: newBoolean
      }
    }
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
    const res = await fetch(`${BASE_URL}/api/v1/dessin_categories/${category.id}/dessins/${image.id}`, config)
    //window.location.reload(false)
    const data = await res.json()

    let newValue = value.map((category) => {
      return {
        ...category, dessins: category.dessins.map((image) => {
          if (image.id === data.id) {
            return {...image, has_to_be_displayed: data.has_to_be_displayed}
          } else {
            return image
        }
      })}
    })

    console.log("00000000000000000000000000")
    console.log("00000000000000000000000000")
    console.log(newValue)
    console.log("00000000000000000000000000")
    console.log("00000000000000000000000000")
    console.log("00000000000000000000000000")
    setValue(newValue)
  }
  // trying useref mapping


  // TEST ZONE --------------------------------------------

//       <button onClick={()=>setValue("new value")}>change</button>
  
  useEffect(() => {
   setContent(props.images)
 },[props.images])

 let cookieIsAuth = false
 const cookie = Cookies.get("cie-lutin-isAuth")
 if (cookie !== undefined) {
   cookieIsAuth = JSON.parse(cookie)
 }
  

  /*
  let options = {
    treshold: .5
  }
  const observer = new IntersectionObserver(imageObserver, options)

  function imageObserver(entries, observer) {
    entries.forEach(entry => {
      console.log(entry)
      if (entry.isIntersecting) {
        const img = entry.target;
        const img_src = img.dataset.src;
        console.log("lazy loading", img)
        img.src = img_src
      }
    })
  }

  let imgs = document.querySelectorAll("img.bd-image")
  imgs.forEach(img => {
   observer.observe(img)
 })
 */
  
  // ----------------------- //
  // FILTER AFTER CATEGORY CHOSEN, OR DEFAULT CATEGORY //

  
  return (
    <div className="bd-content-wrapper">

    
      <ImagesReader totalImagesCount={props.totalImagesCount} defaultCustomIndex={defaultCustomIndex} selectedImage={selectedImage} defaultArrayAndIndex={defaultArrayAndIndex} images={props.images} />
      <EditPhoto  editSelectedImage={editSelectedImage} editSelectedCategory={editSelectedCategory}/>
      <div className="bd-images-container">
      <div className="bd-dessins-title">

          <h2 >Dessins et croquis</h2>

       
          </div>
        {props.images && props.images.map((imageCategory, cateIndex) => (
          <>
        
            <div className={`bd-images-grid ${imageCategory.title}`} >
            <h5>{imageCategory.title}</h5>
              <Masonry 
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column">
                {imageCategory.dessins.map((dessin, imageIndex) => (
                  <>
     
                    {dessin.has_to_be_displayed === true ?
                      <div className="grid-item" key={dessin.id} >
                        {cookieIsAuth === true ?
                          <>
                             <div className="bd-image-hide-btn" onClick={()=>handleHideImage(dessin, imageCategory)}><img src={hideIcon} alt="hide"/></div>
                      <div className="bd-image-edit" onClick={()=>openEditModal(dessin, imageCategory)}><img src={editIcon} alt="edit"/></div>
                      <div className="bd-image-destroy" onClick={()=>tryToDestroyImage(dessin, imageCategory)}><img src={deleteIcon} alt="delete"/></div>
                          </>
                          :
                          <></>
                        }
                     
                      <LazyLoadImage width={"100%"} effect="blur" className="bd-image" onClick={(e)=>openImagesReader(e,imageIndex,cateIndex, imageCategory, dessin.customIndex)} src={dessin.image_url} alt="drawing"/>
                          </div>
                      :
                      <div className="grid-item red" key={dessin.id} >
                      {cookieIsAuth === true ?
                          <>
                             <div className="bd-image-hide-btn" onClick={()=>handleHideImage(dessin, imageCategory)}><img src={hideIcon} alt="hide"/></div>
                      <div className="bd-image-edit" onClick={()=>openEditModal(dessin, imageCategory)}><img src={editIcon} alt="edit"/></div>
                      <div className="bd-image-destroy" onClick={()=>tryToDestroyImage(dessin, imageCategory)}><img src={deleteIcon} alt="delete"/></div>
                          </>
                          :
                          <></>
                        }
                        <LazyLoadImage width={"100%"}  effect="blur" className="bd-image" onClick={(e)=>openImagesReader(e,imageIndex,cateIndex,imageCategory,dessin.customIndex)} src={dessin.image_url} alt="drawing"/>
                          </div>
                    }
              
                    </>
            ))}
         </Masonry>
            </div>
            </>
        ))}
      </div>
    </div>
  )
}

export default Content