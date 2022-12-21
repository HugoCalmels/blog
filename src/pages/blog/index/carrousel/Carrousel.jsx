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
  let spacing = 0
  let lastIndex
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [timer, setTimer] = useState(0)
  const [pause, setPause] = useState(false)
  const [defaultImageWidth, setDefaultImageWidth] = useState(0)
  const carrouselFrameElem = useRef(null)
  const intervalRef = useRef(null)
  const navigationBtnsRef = useRef([])
  const imagesRef = useRef([])
  const editCarrouselRef = useRef(null)
  const bntOpenEditModalRef = useRef(null)
  navigationBtnsRef.current = [];
  imagesRef.current = []
  const carrouselPauseElemLeft = useRef(null)
  const carrouselPauseElemRight = useRef(null)
  const addBtnToRef = (el) => {
    if (el && !navigationBtnsRef.current.includes(el)) {
      navigationBtnsRef.current.push(el)
      console.log("?????")
      console.log(el.offsetWidth)
    }
  }
  const addImageToRef = (el) => {
    if (el && !imagesRef.current.includes(el)) {
       imagesRef.current.push(el)
      console.log("?????")
      console.log(el.offsetWidth)
      setDefaultImageWidth(el.offsetWidth)
      //spacing = 0 - el.offsetWidth
    }
  }


  let carrouselArray = [] // can I have a better function ?
  props.fetchedData.filter((type) => {
    if (type.id === 1) {
      carrouselArray = type
     }
  })

  const addDistance = () => {
    console.log("---")
    console.log("HELO IM DONE ?")
    console.log(defaultImageWidth)
    

    spacing += defaultImageWidth




    console.log(spacing)
 
    return spacing;
  }

  const moveCarrouselToImage = (newIndex) => {
    carrouselFrameElem.current.style.transform = `translateX(-${(newIndex) * defaultImageWidth}px)`
    currentIndexInterval = newIndex 
    stopCounter()
    startCounter()
    setCurrentImageIndex(newIndex)
 
  }

  const colorSelectedBtn = () => {
    if (navigationBtnsRef.current.length > 0) {
      navigationBtnsRef.current.forEach((el) => {
        el.classList.remove("selected")
      })
      navigationBtnsRef.current[currentImageIndex].classList.add("selected")
    }
  }

  useEffect(() => {
    colorSelectedBtn()
  }, [currentIndexInterval, currentImageIndex])
  

  const autoMoveImage = (index) => {
    carrouselFrameElem.current.style.transform = `translateX(-${(index) * defaultImageWidth}px)`
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
    console.log("HELLO CAN YOU STOP MY COUNTER MOFO ?")
    console.log(props.page)
    if (props.page !== "b-index") {
      stopCounter()
    } else {
      startCounter(currentImageIndex)
    }
  },[props.page])
  


  useEffect(() => {
    // init setInterval one time only, once data is fetched
    if (carrouselArray !== [] && carrouselArray.homes) {
      navigationBtnsRef.current[currentImageIndex].classList.add("selected")
      actionsInterval(currentIndexInterval)
    }

  }, [carrouselArray]);


    if (navigationBtnsRef.current.length > 0) {
      console.log("TEST")
      console.log(navigationBtnsRef.current[1].offsetWidth)
      console.log("TEST")
    } 

  
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


  const actionsInterval = () => {
    
    console.log("INTERVAL")

  
    intervalRef.current = setInterval(() => {

      if (window.location.pathname === "/gaelle-boucherit" && carrouselArray.length !== 0) {
        setTimer(timer => timer + 1)
      lastIndex = currentIndexInterval
        
      if (currentIndexInterval < carrouselArray.homes.length -1  && carrouselArray.homes.length -1 !== null) { 
        currentIndexInterval++
      } else if (currentIndexInterval >= carrouselArray.homes.length  -1 && carrouselArray.homes.length -1 !== null) {
        currentIndexInterval = 0
      }
      setCurrentImageIndex(currentIndexInterval)

        if (carrouselFrameElem.current) {
          carrouselFrameElem.current.style.transform = `translateX(-${(currentIndexInterval) * defaultImageWidth}px)`
        }
       

      }
      
     
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

  const changeColor = (e) => {
    e.preventDefault()
    console.log("CHANGE COLOR !!!")
    console.log(carrouselPauseElemLeft.current.style)
    carrouselPauseElemLeft.current.style.backgroundColor = "#bbbbbb"
    carrouselPauseElemRight.current.style.backgroundColor = "#bbbbbb"
  }

  const removeColor = (e) => {
    e.preventDefault()
    carrouselPauseElemLeft.current.style.backgroundColor = "#737373"
    carrouselPauseElemRight.current.style.backgroundColor = "#737373"
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
        {carrouselArray.homes && carrouselArray.homes.map((image, index) => (
        <>
          { index === 0 ?
            <div className="b-index-carrousel__img_unit"
            style={{ left: 0 + "px" }}
            ref={addImageToRef}
          >
            <img src={image.image_url} />
            </div>
              :
              <div className="b-index-carrousel__img_unit"
          style={{ left: addDistance() + "px" }}
          ref={addImageToRef}
        >
          <img src={image.image_url} />
          </div>
          }
        
          </>
      ))}
      </div>

      <div className="b-index-carrousel-btns-container">
        {pause ?
          <div className="b-index-carrousel-btn-play" onClick={togglePause}>

          </div>
          :
          <div className="b-index-carrousel-btn-pause" onClick={togglePause} onMouseEnter={(e)=>changeColor(e)} onMouseLeave={(e)=>removeColor(e)}>
          <div className="b-index-cbp-bar" ref={carrouselPauseElemLeft}></div>
          <div className="b-index-cbp-bar"ref={carrouselPauseElemRight}></div>
          </div>
        }
 
        {carrouselArray.homes && carrouselArray.homes.map((el, index) => (
          <div className="b-index-carrousel__img_unit__btn"
            onClick={() => moveCarrouselToImage(index)}
            ref={addBtnToRef}
          >
            
          </div>
        ))}
        </div>
    </div>
  )
}

export default Carrousel