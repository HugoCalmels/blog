import CategoryContent from "./CategoryContent";

const Category = (props) => {
  return (
    <>
      {props.imageCategory.photos &&
        props.imageCategory.photos.map((image, imageIndex) => (
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
  );
};

export default Category;
