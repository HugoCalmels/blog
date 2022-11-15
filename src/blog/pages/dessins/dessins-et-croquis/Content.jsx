import "./Content.scss"
import Masonry from 'react-masonry-css'
import { useEffect, useState } from "react";
import ImagesReader from "./ImagesReader"
import EditPhoto from "./EditPhoto"
const Content = (props) => {
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedImageCategory, setSelectedImageCategory] = useState([])

  const [defaultArrayAndIndex, setDefaultArrayAndIndex] = useState({
    category: [],
    imageIndex: '',
    arrayIndex: ''
  })

  const [editSelectedImage, setEditSelectedImage] = useState("")
  const [editSelectedCategory, setEditSelectedCategory] = useState("")
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  const openImagesReader = (e,imageIndex,arrayIndex, category) => {
    e.preventDefault();
    // can improve this using context // i want only the child comp to refresh but my usestate is here
    console.log("openImageReader is launched")
    const imagesReaderElem = document.querySelector('.bd-images-reader')
    imagesReaderElem.style.display = "flex"
    //setSelectedImage(image)

    console.log('000000000000000000000000000000000000000000000000')
    console.log('000000000000000000000000000000000000000000000000')
    console.log('000000000000000000000000000000000000000000000000')
    console.log("image index:"+imageIndex)
    console.log("array index:"+arrayIndex)
    console.log('000000000000000000000000000000000000000000000000')
    console.log('000000000000000000000000000000000000000000000000')
    console.log('000000000000000000000000000000000000000000000000')
    //setSelectedImageCategory(category)
    setDefaultArrayAndIndex({
      category: category,
      imageIndex: imageIndex,
      arrayIndex: arrayIndex
    })
  }

  const tryToDestroyImage = (image, category) => {
    let answer = window.confirm("voulez vous détruire cette image ?")
    if (answer) {
      submitImageDestroyAPI(image, category)
    }
  }

  const submitImageDestroyAPI = async (image, category) => {
    await fetch(`http://localhost:3000/api/v1/dessin_categories/${category.id}/dessins/${image.id}`, {
      method: "DELETE"
    })
    window.location.reload(false)
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
    await fetch(`http://localhost:3000/api/v1/dessin_categories/${category.id}/dessins/${image.id}`, config)
    window.location.reload(false)
  }
  
  return (
   <div className="bd-content-wrapper">
      <ImagesReader selectedImage={selectedImage} defaultArrayAndIndex={defaultArrayAndIndex} images={props.images} />
      <EditPhoto editSelectedImage={editSelectedImage} editSelectedCategory={editSelectedCategory}/>
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
                      <div className="bd-image-hide-btn" onClick={()=>handleHideImage(dessin, imageCategory)}>H</div>
                      <div className="bd-image-edit" onClick={()=>openEditModal(dessin, imageCategory)}>E</div>
                      <div className="bd-image-destroy" onClick={()=>tryToDestroyImage(dessin, imageCategory)}>X</div>
                      <img className="bd-image" onClick={(e)=>openImagesReader(e,imageIndex,cateIndex, imageCategory)} src={dessin.image_url} alt="drawing"/>
                          </div>
                      :
                      <div className="grid-item red" key={dessin.id} >
                      <div className="bd-image-hide-btn" onClick={()=>handleHideImage(dessin, imageCategory)}>H</div>
                      <div className="bd-image-edit" onClick={()=>openEditModal(dessin, imageCategory)}>E</div>
                      <div className="bd-image-destroy" onClick={()=>tryToDestroyImage(dessin, imageCategory)}>X</div>
                      <img className="bd-image" onClick={(e)=>openImagesReader(e,imageIndex,cateIndex,imageCategory)} src={dessin.image_url} alt="drawing"/>
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