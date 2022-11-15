import "./ImagesReader.scss";
import { useEffect, useState } from "react";

const ImagesReader = (props) => {

  const closeMenu = () => {
    document.querySelector(".bd-images-reader").style.display = "none";
  };
  // --------------------------------------------------------------------------------
  
  // I hate what Im doing. Its so hard to understand.
  // Just want to make it simple.
  // An array, an index, and deal with it.

  const [currentArray, setCurrentArray] = useState([])
  const [currentArrayIndex, setCurrentArrayIndex] = useState("")
  const [currentArrayImageIndex, setCurrentArrayImageIndex] = useState("")

  const [disableRightPaginationBtn, setDisableRightPaginationBtn] = useState(false)

  // init when called from parent
  useEffect(() => {
    if (props.defaultArrayAndIndex.imageIndex !== '') {
      setCurrentArray(props.defaultArrayAndIndex.category)
      setCurrentArrayIndex(props.defaultArrayAndIndex.arrayIndex)
      setCurrentArrayImageIndex(props.defaultArrayAndIndex.imageIndex)
    }
  }, [props.defaultArrayAndIndex])
  
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
    console.log('backward launched')
    e.preventDefault();
    if (currentArrayIndex  <= 0 ) {
      // reset la boucle 
      console.log('33333333333333333333333333333333333333')
      console.log("HII")
      console.log(props.images[props.images.length - 1])
      console.log(props.images.length - 1)
      console.log(props.images[props.images.length-1].dessins.length - 1)
      console.log('33333333333333333333333333333333333333')
      setCurrentArray(props.images[props.images.length-1])
      setCurrentArrayIndex(props.images.length-1)
      setCurrentArrayImageIndex(props.images[props.images.length-1].dessins.length - 1)
    } else {
      console.log("6666666666666666666")
      console.log("6666666666666666666")
      console.log(currentArrayImageIndex)
      console.log("6666666666666666666")
      console.log("6666666666666666666")
      if (currentArrayImageIndex  <= 0) {
        // go next array 
        console.log("9999999999999999")
        console.log("9999999999999999")
        console.log(props.images[currentArrayIndex - 1].dessins.length)
        console.log("9999999999999999")
        console.log("9999999999999999")
        if (props.images[currentArrayIndex - 1].dessins.length !== 0) {
          // saute 1
          console.log("çççççççççççççççççççççççççççççççççççççççççççç")
          console.log("saute 1")
          console.log(props.images[currentArrayIndex - 1])
          console.log(currentArrayIndex - 1)
          console.log(props.images[currentArrayIndex - 1].dessins.length)
          console.log("çççççççççççççççççççççççççççççççççççççççççççç")
          setCurrentArray(props.images[currentArrayIndex-1])
          setCurrentArrayIndex(currentArrayIndex-1)
          setCurrentArrayImageIndex(props.images[currentArrayIndex-1].dessins.length - 1)
        } else {
          console.log("saute 2")
          console.log("77777777777777777777")
          console.log(props.images[currentArrayIndex - 1])
          console.log(currentArrayIndex - 1)
          console.log(props.images[currentArrayIndex - 1].dessins.length)
          console.log("77777777777777777777")
          // saute 2 si dessins.length = 0
          setCurrentArray(props.images[currentArrayIndex-2])
          setCurrentArrayIndex(currentArrayIndex-2)
          setCurrentArrayImageIndex(props.images[currentArrayIndex-2].dessins.length - 1)
        }
      } else {
        console.log('WHAT??')
        setCurrentArrayImageIndex(currentArrayImageIndex - 1)
      }
    }
  }


  // in the end we just gonna print the array[index]
  
  console.log("nnnnnnnnnnnn")
  console.log(currentArray)
  console.log(currentArrayImageIndex)
  if (currentArrayImageIndex !== "") {
  console.log(currentArray.dessins[currentArrayImageIndex])
}
  console.log("nnnnnnnnnnnn")



  return (
    <div className="bd-images-reader">
      {currentArrayImageIndex !== '' ?
        <>
        <div className="bd-images-reade-close-menu" onClick={closeMenu}>
        "X"
      </div>
      <div className="bd-images-reader-references">
      <p onClick={(e)=>imagesPaginationForward(e)}>increment</p>
      <p onClick={(e)=>imagesPaginationBackward(e)}>decrement</p>
        <p>titre : {currentArray.dessins[currentArrayImageIndex].title} </p>
        <p>matériel : {currentArray.dessins[currentArrayImageIndex].material}</p>
        <p>largeur : {currentArray.dessins[currentArrayImageIndex].height}</p>
        <p>longueur : {currentArray.dessins[currentArrayImageIndex].width}</p>
        <p>référence : {currentArray.dessins[currentArrayImageIndex].ref} </p>
        {currentArray.dessins[currentArrayImageIndex].has_to_be_displayed === true ? (
          <p>displayed : true </p>
        ) : (
          <p>displayed : false </p>
        )}
      </div>
      <div className="bd-image-selected">
        <img src={currentArray.dessins[currentArrayImageIndex].image_url} />
          </div>
        </>
        :
        <></>
      }
           
   
    </div>
  );
};

export default ImagesReader;
