import "./Carrousel.scss"
import { useState, useEffect, useRef, useCallback } from "react"
import EditCarrousel from "./EditCarrousel"
import gearIcon from "../../../../assets/icons/gearIcon.png"
import Cookies from "js-cookie";

const Carrousel = (props) => {

  // bit of a mess :
  // - currentImageIndex represents the current_image_index outside the setInterval 
  // - currentIndexInterval represents the current_image_index inside the setInterval
  const isAuthCookie = Cookies.get("cie-lutin-isAuth") ? JSON.parse(Cookies.get("cie-lutin-isAuth")) : null
  let currentIndexInterval = 0
  let spacing = -1180;
  let lastIndex
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [timer, setTimer] = useState(0)
  const [pause, setPause] = useState(false)
  const carrouselFrameElem = useRef(null)
  const intervalRef = useRef(null)
  const imagesRef = useRef([])
  const editCarrouselRef = useRef(null)
  const bntOpenEditModalRef = useRef(null)
  imagesRef.current = [];

  const addToRefs = (el) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el)
    }
  }

  let carrouselArray = [] // can I have a better function ?
  props.fetchedData.filter((type) => {
    if (type.id === 1) {
      carrouselArray = type
     }
  })

  const addDistance = () => {
    spacing += 1180;
    return spacing;
  }

  const moveCarrouselToImage = (newIndex) => {
    carrouselFrameElem.current.style.transform = `translateX(-${(newIndex) * 1180}px)`
    currentIndexInterval = newIndex 
    stopCounter()
    startCounter()
    setCurrentImageIndex(newIndex)
  }

  const colorSelectedBtn = () => {
    if (imagesRef.current.length > 0) {
      imagesRef.current.forEach((el) => {
        el.classList.remove("selected")
      })
      imagesRef.current[currentImageIndex].classList.add("selected")
    }
  }

  useEffect(() => {
    colorSelectedBtn()
  }, [currentIndexInterval, currentImageIndex])
  

  const autoMoveImage = (index) => {
    carrouselFrameElem.current.style.transform = `translateX(-${(index) * 1180}px)`
    setCurrentImageIndex(currentImageIndex)
  }

  const togglePause = () => {
    if (pause === false) {
      stopCounter()
    } else {
      startCounter(currentImageIndex)
    }
  }

  const stopCounter = () => {
    clearInterval(intervalRef.current);
    setPause(true);
  }
  


  useEffect(() => {
    // init setInterval one time only, once data is fetched
    if (carrouselArray !== [] && carrouselArray.homes) {
      imagesRef.current[currentImageIndex].classList.add("selected")
      actionsInterval(currentIndexInterval)
    }
  }, [carrouselArray]);
  
  useEffect(() => {
    autoMoveImage(currentImageIndex)
  }, [currentImageIndex])


  


  const startCounter = (newIndex) => {
    if (newIndex) {
      currentIndexInterval = newIndex
    }
      actionsInterval()
  

    
    setPause(false);
  }


  const actionsInterval = () =>{
    intervalRef.current= setInterval(() => {
      setTimer(timer => timer + 1)
      lastIndex = currentIndexInterval
      if (currentIndexInterval < carrouselArray.homes.length -1 ) { 
        currentIndexInterval++
      } else if (currentIndexInterval >= carrouselArray.homes.length  -1 ) {
        currentIndexInterval = 0
      }
      setCurrentImageIndex(currentIndexInterval)
      carrouselFrameElem.current.style.transform = `translateX(-${(currentIndexInterval) * 1180}px)`
}, 5000)
  }

  const openEditCarrouselModal = (e) => {
    e.preventDefault()
    editCarrouselRef.current.classList.add("active")
    bntOpenEditModalRef.current.classList.remove("active")
  }
  const closeEditModal = (e) => {
    e.preventDefault()
    editCarrouselRef.current.classList.remove("active")
    bntOpenEditModalRef.current.classList.add("active")
  }

  return (
    <div className="b-index-carrousel-wrapper">
      {isAuthCookie ?
        <div className="b-index-carrousel-edit-modal-toggle-btn active" onClick={(e)=>openEditCarrouselModal(e)} ref={bntOpenEditModalRef}>
        <img src={gearIcon} alt="edit carrousel"></img>
        </div>
        :
        <></>}
      
      <EditCarrousel carrouselArray={carrouselArray} editCarrouselRef={editCarrouselRef} closeEditModal={closeEditModal} />

      <div className="b-index-carrousel-images-container" ref={carrouselFrameElem}>
      {carrouselArray.homes && carrouselArray.homes.map((image,index) => (
        <div className="b-index-carrousel__img_unit"
          style={{ left: addDistance() + "px" }}
     
        >
          <img src={image.image_url} />
          </div>
      ))}
      </div>

      <div className="b-index-carrousel-btns-container">
        {pause ?
          <div className="b-index-carrousel-btn-play" onClick={togglePause}>

          </div>
          :
          <div className="b-index-carrousel-btn-pause" onClick={togglePause}>
          <div className="b-index-cbp-bar"></div>
          <div className="b-index-cbp-bar"></div>
          </div>
        }
 
        {carrouselArray.homes && carrouselArray.homes.map((el, index) => (
          <div className="b-index-carrousel__img_unit__btn"
            onClick={() => moveCarrouselToImage(index)}
            ref={addToRefs}
          >
            
          </div>
        ))}
        </div>
    </div>
  )
}

export default Carrousel