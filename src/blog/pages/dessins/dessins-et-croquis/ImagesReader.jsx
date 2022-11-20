import "./ImagesReader.scss";
import { useEffect, useState , useRef} from "react";
import customChevron from "../../../../assets/icons/chevronDroit.png"
import closeMenuIcon from "../../../../assets/icons/xCloseIcon.png"
const ImagesReader = (props) => {

  const [currentArray, setCurrentArray] = useState([])
  const [currentArrayIndex, setCurrentArrayIndex] = useState("")
  const [currentArrayImageIndex, setCurrentArrayImageIndex] = useState("")

  const imagesReaderElement = useRef(null)

  const closeMenu = () => {
    //document.querySelector(".bd-images-reader").style.display = "none";
    imagesReaderElement.current.style.display = "none"
  };

  const imagesPaginationForward = (e) => {
    e.preventDefault();
    if (currentArrayIndex + 1 >= props.images.length) {
      // reset la boucle 
      setCurrentArray(props.images[0])
      setCurrentArrayIndex(0)
      setCurrentArrayImageIndex(0)
    } else {
      if (currentArrayImageIndex + 1 >= currentArray.dessins.length) {
        // go next array 
        if (props.images[currentArrayIndex + 1].dessins.length > 0) {
          // saute 1
          setCurrentArray(props.images[currentArrayIndex+1])
          setCurrentArrayIndex(currentArrayIndex+1)
          setCurrentArrayImageIndex(0)
        } else {
          // saute 2 si dessins.length = 0
          setCurrentArray(props.images[currentArrayIndex+2])
          setCurrentArrayIndex(currentArrayIndex+2)
          setCurrentArrayImageIndex(0)
        }
      } else {
        setCurrentArrayImageIndex(currentArrayImageIndex + 1)
      }
    }
  }

  const imagesPaginationBackward = (e) => {
    e.preventDefault();
    if (currentArrayIndex  <= 0 ) {
      setCurrentArray(props.images[props.images.length-1])
      setCurrentArrayIndex(props.images.length-1)
      setCurrentArrayImageIndex(props.images[props.images.length-1].dessins.length - 1)
    } else {
      if (currentArrayImageIndex  <= 0) {
        if (props.images[currentArrayIndex - 1].dessins.length !== 0) {
          setCurrentArray(props.images[currentArrayIndex-1])
          setCurrentArrayIndex(currentArrayIndex-1)
          setCurrentArrayImageIndex(props.images[currentArrayIndex-1].dessins.length - 1)
        } else {
          setCurrentArray(props.images[currentArrayIndex-2])
          setCurrentArrayIndex(currentArrayIndex-2)
          setCurrentArrayImageIndex(props.images[currentArrayIndex-2].dessins.length - 1)
        }
      } else {
        setCurrentArrayImageIndex(currentArrayImageIndex - 1)
      }
    }
  }

    // init when called from parent
    useEffect(() => {
      if (props.defaultArrayAndIndex.imageIndex !== '') {
        setCurrentArray(props.defaultArrayAndIndex.category)
        setCurrentArrayIndex(props.defaultArrayAndIndex.arrayIndex)
        setCurrentArrayImageIndex(props.defaultArrayAndIndex.imageIndex)
      }
    }, [props.defaultArrayAndIndex])


  // -----------------------------------------------------------------------------

    // one idea is to display all the images as a carousel in the browser
    // try not to display all if possible ( only - 1 / and + 1), and that part may be hard to achieve.
    // and then soooo simply to navigate from one to another using only the dom ( or virtual dom )
    // might wanna push to save my code.
    // but honestly Im up to restart from scratch
  
    //1st problem : size & co ( solved ! )
  //2nd problem : trying useref in map : a full mess

  const [defaultCurrentIndex, setDefaultCurrentIndex] = useState('')
  const readerMain = useRef(null)
  const paginateLeft = useRef(null)
  const paginateRight = useRef(null)
  const newIncrementionFunction = () => {
    // need current image position ( custom_index )
    // need total_images_count
  }

  useEffect(() => {
    if (props.defaultCustomIndex !== '') {
      console.log('init')
      console.log(props.defaultCustomIndex)
      //setCurrentImageTest(props.defaultCustomIndex)


      // code to move or translate the array block ?
      readerMain.current.style.transform = `translateX(-${100*props.defaultCustomIndex-100}vw)`
      setDefaultCurrentIndex(props.defaultCustomIndex)
      
    }
  },[props.defaultCustomIndex])
 

  let spacing = -100 
  const addDistance = () => {
    spacing += 100
    return spacing
  }


  const paginateForward = (e) => {
    e.preventDefault()
    console.log('aaaaaaaaaaaaaaaa')
    console.log(defaultCurrentIndex)
    console.log('aaaaaaaaaaaaaaaa')
    readerMain.current.style.transform = `translateX(-${(defaultCurrentIndex * 100)}vw)`
    setDefaultCurrentIndex(defaultCurrentIndex + 1)
    console.log(`-${(defaultCurrentIndex * 100)}vw`)
  }
  const paginateBackward = (e) => {
    e.preventDefault()
    //readerMain.current.style.transform = `translateX(-${((defaultCurrentIndex - 2) * 100)}vw)`
    //setDefaultCurrentIndex(defaultCurrentIndex - 1)

      setDefaultCurrentIndex(defaultCurrentIndex - 1)
      readerMain.current.style.transform = `translateX(-${((defaultCurrentIndex - 2) * 100)}vw)`
  
  }

  useEffect(() => {
    console.log('lllllllllllllllll')
    console.log(defaultCurrentIndex)
    console.log('lllllllllllllllll')
    if (defaultCurrentIndex === 1) {
      paginateLeft.current.style.display = "none"
    } else {
      paginateLeft.current.style.display = "block"
    }

    if (defaultCurrentIndex > props.totalImagesCount - 1) {
      paginateRight.current.style.display = "none"
    } else {
      paginateRight.current.style.display = "block"
    }
  },[defaultCurrentIndex])

  useEffect(() => {
    
  },[props.images])
  
  return (
    <div className="bd-images-reader" ref={imagesReaderElement}>
      
      <div className="bd-images-reader-carrousel">
        
         
        <div className="bd-images-reader-main" ref={readerMain}>
        {currentArrayIndex !== '' ?
            <>
              {props.images.map((category) => (
                category.dessins.map((image) => (
              
                  <div className="bd-images-reader-unit" style={{ left: addDistance()+"vw" }}>
                  <div className="bd-images-reader-unit-container">
                  <img src={image.image_url}/>
                    </div>
                    <div className="bd-images-reader-unit-references">
                      <p className="bd-irur-title">{image.title} </p>
                      <p className="bd-irur-ref">Référence : <span>#{image.ref}</span> </p>
                      <p>Longueur : {image.width} cm</p>
                      <p>Largeur : {image.height} cm</p>
                      {image.material !== '' ?
                        <p>Matériel : {image.material}</p>
                        :
                        <></>
                      }
                
              
  
                    </div>
                  </div>
             
              ))
            ))}
      
            </>
            :
            <></>
          }
        </div>


          <div className="bd-images-reader-chevron left"  ref={paginateLeft}>
          <img src={customChevron} id="chevron-left" alt="chevron" onClick={(e) => paginateBackward(e)}  />
          </div>
          <div className="bd-images-reader-chevron right"ref={paginateRight}>
          <img src={customChevron} id="chevron-right" alt="chevron" onClick={(e)=>paginateForward(e)}   />
        </div>
        <div className="bd-images-reader-close-modal" onClick={closeMenu}><img src={closeMenuIcon}alt="close"/></div>
       
      </div>
      
    </div>
  );
};

export default ImagesReader;
