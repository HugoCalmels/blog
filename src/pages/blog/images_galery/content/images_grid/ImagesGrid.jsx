import GridItem from "./GridItem";
import Masonry from "react-masonry-css";

const ImagesGrid = (props) => {

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  console.log("IMAGE GRID");
  console.log("IMAGE GRID");
  console.log(props.image);

  const imagesArray = () => {
    if (props.arg === "dessins") {
      return props.imageCategory.dessins;
    } else if (props.arg === "paysages") {
      return props.imageCategory.paysages;
    }
  };

  // Masonry will build only if "my-masonry-grid" &&  "grid-item" are the same component.
  // Means I cant handle better conditionnal rendering.
  return (
    <div className={`bd-images-grid ${props.imageCategory.title}`}>
      <h5>{props.imageCategory.title}</h5>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {imagesArray() &&
          imagesArray().map((image, imageIndex) => (
            <>
              {image.has_to_be_displayed === true ? (
                <div className="grid-item" key={image.id}>
                  <GridItem
                    cookieIsAuth={props.cookieIsAuth}
                    handleHideImage={props.handleHideImage}
                    image={image}
                    imageCategory={props.imageCategory}
                    openEditModal={props.openEditModal}
                    tryToDestroyImage={props.tryToDestroyImage}
                    openImagesReader={props.openImagesReader}
                    imageIndex={imageIndex}
                    cateIndex={props.cateIndex}
                  />
                </div>
              ) : (
                <div className="grid-item red" key={image.id}>
                  <GridItem
                    cookieIsAuth={props.cookieIsAuth}
                    handleHideImage={props.handleHideImage}
                    image={image}
                    imageCategory={props.imageCategory}
                    openEditModal={props.openEditModal}
                    tryToDestroyImage={props.tryToDestroyImage}
                    openImagesReader={props.openImagesReader}
                    imageIndex={imageIndex}
                    cateIndex={props.cateIndex}
                  />
                </div>
              )}
            </>
          ))}
      </Masonry>
    </div>
  );
};

export default ImagesGrid;
