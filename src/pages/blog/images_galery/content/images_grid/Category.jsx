import CategoryContent from "./CategoryContent"

const Category = (props) => {
  return (
    <>
      {props.arg === "dessins" ?
        <>
          {props.imageCategory.dessins && props.imageCategory.dessins.map((image, imageIndex) => (
  <CategoryContent
    image={image}
    imageIndex={imageIndex}
    cateIndex={props.cateIndex}
    cookieIsAuth={props.cookieIsAuth}
    handleHideImage={props.handleHideImage}
    imageCategory={props.imageCategory}
    openEditModal={props.openEditModal}
    tryToDestroyImage={props.tryToDestroyImage}
    openImagesReader={props.openImagesReader}
  />
))}
        </>
        : props.arg === "paysages" ?
          <>
            {props.imageCategory.paysages && props.imageCategory.paysages.map((image, imageIndex) => (
  <CategoryContent
    image={image}
    imageIndex={imageIndex}
    cateIndex={props.cateIndex}
    cookieIsAuth={props.cookieIsAuth}
    handleHideImage={props.handleHideImage}
    imageCategory={props.imageCategory}
    openEditModal={props.openEditModal}
    tryToDestroyImage={props.tryToDestroyImage}
    openImagesReader={props.openImagesReader}
  />
))}
          </>
        :
        <></>
      }
    </>
  )
}

export default Category

