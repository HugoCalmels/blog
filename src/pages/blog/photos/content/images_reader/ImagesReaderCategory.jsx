import ImagesReaderImage from "./ImagesReaderImage"
const ImagesReaderCategory = (props) =>{
  return (
    <>
     
          {props.category.photos && props.category.photos.map((image) => (
                 <ImagesReaderImage
                   image={image}
                   addDistance={props.addDistance}
                   category={props.category}
                 />
      ))}
  </>
  )
}

export default ImagesReaderCategory