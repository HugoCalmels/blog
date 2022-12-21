import ImagesReaderImage from "./ImagesReaderImage"
const ImagesReaderCategory = (props) =>{
  return (
    <>
      {props.arg === "dessins" ?
        <>
               {props.category.dessins && props.category.dessins.map((image) => (
                 <ImagesReaderImage
                   image={image}
                   addDistance={props.addDistance}
                   category={props.category}
                 />
      ))}
        </>
        : props.arg === "paysages" ?
          <>
                 {props.category.paysages &&  props.category.paysages.map((image) => (
                   <ImagesReaderImage
                   image={image}
                   addDistance={props.addDistance}
                   category={props.category}
                   />
      ))}
          </>
        : props.arg === "carnets" ?
        <>
        {props.category.carnets &&  props.category.carnets.map((image) => (
          <ImagesReaderImage
          image={image}
          addDistance={props.addDistance}
          category={props.category}
          />
))}
 </>
        :
      <></>
      }
 
  </>
  )
}

export default ImagesReaderCategory